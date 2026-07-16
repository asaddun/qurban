<?php

namespace App\Services;

use App\Helpers\Phone;
use App\Models\Participant;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ParticipantService
{
    public function checkParticipantByPhone(string $phone): ?Participant
    {
        return Participant::query()
            ->where('phone', Phone::normalize($phone))
            ->with([
                'shohibulQurbans.qurbanType:id,name',
            ])
            ->first();
    }

    public function register(array $data): Participant
    {
        return DB::transaction(function () use ($data) {

            $participant = $this->createParticipant(
                $data['participant']
            );

            $this->createShohibuls(
                $participant,
                $data['shohibuls']
            );

            $this->refreshTotalAmount($participant);

            return $participant->load(
                'shohibulQurbans.qurbanType'
            );
        });
    }

    public function addShohibuls(
        array $participantData,
        array $shohibuls
    ): Participant {
        return DB::transaction(function () use (
            $participantData,
            $shohibuls
        ) {

            $participant = Participant::query()
                ->findOrFail($participantData['id']);

            if ($participant->phone !== $participantData['phone']) {
                throw ValidationException::withMessages([
                    'participant.phone' => 'Data participant tidak sesuai.',
                ]);
            }

            $this->createShohibuls(
                $participant,
                $shohibuls
            );

            $this->refreshTotalAmount($participant);

            return $participant->load(
                'shohibulQurbans.qurbanType'
            );
        });
    }

    private function createParticipant(
        array $participantData
    ): Participant {
        return Participant::create([
            'name' => $participantData['name'],
            'phone' => Phone::normalize($participantData['phone']),
            'address' => $participantData['address'],
            'request_part' => $participantData['request_part'] ?? null,
            'self_distribution_cow' => $participantData['self_distribution_cow'] ?? 0,
            'self_distribution_goat' => $participantData['self_distribution_goat'] ?? 0,
            'notes' => $participantData['notes'] ?? null,
            'total_amount' => 0,
        ]);
    }

    private function createShohibuls(
        Participant $participant,
        array $shohibuls
    ): void {
        $participant->shohibulQurbans()->createMany(
            collect($shohibuls)
                ->map(fn($shohibul) => [
                    'name' => $shohibul['name'],
                    'qurban_type_id' => $shohibul['qurban_type_id'],
                ])
                ->toArray()
        );
    }

    private function refreshTotalAmount(
        Participant $participant
    ): void {
        $participant->load('shohibulQurbans.qurbanType');

        $totalAmount = $participant->shohibulQurbans
            ->sum(fn($shohibul) => $shohibul->qurbanType->price);

        $participant->update([
            'total_amount' => $totalAmount,
        ]);
    }
}
