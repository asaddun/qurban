<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\Public\StoreParticipantRequest;
use App\Models\QurbanType;
use App\Services\ParticipantService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantController extends Controller
{
    public function __construct(
        private readonly ParticipantService $participantService,
    ) {}

    public function check(Request $request): JsonResponse
    {
        $request->validate([
            'phone' => ['required', 'string', 'max:20']
        ]);

        $participant = $this->participantService->checkParticipantByPhone($request->phone);

        return response()->json([
            'participant' => $participant
                ? [
                    'id' => $participant->id,
                ]
                : null,
        ]);
    }

    public function create(): Response
    {
        $qurbanTypes = QurbanType::query()
            ->where('active', true)
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'price',
            ]);

        return Inertia::render('public/register', [
            'qurbanTypes' => $qurbanTypes,
        ]);
    }

    public function store(
        StoreParticipantRequest $request,
    ): RedirectResponse {
        $participant = $request->validated('participant');

        if (!empty($participant['id'])) {
            $this->participantService->addShohibuls(
                $participant['id'],
                $request->validated('shohibuls'),
            );
        } else {
            $this->participantService->register(
                $request->validated(),
            );
        }

        return redirect()
            ->route('register')
            ->with('success', 'Pendaftaran qurban berhasil dikirim.');
    }
}
