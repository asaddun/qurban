<?php

namespace App\Http\Requests\Public;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreParticipantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Participant
            'participant' => ['required', 'array'],

            'participant.name' => [
                'required',
                'string',
                'max:255',
            ],

            'participant.phone' => [
                'required',
                'string',
                'max:20',
            ],

            'participant.address' => [
                'sometimes',
                'string',
            ],

            'participant.request_part' => [
                'nullable',
                'string',
                'max:255',
            ],

            'participant.dist_cow' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'participant.dist_goat' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'participant.notes' => [
                'nullable',
                'string',
                'max:1000',
            ],

            // Shohibul
            'shohibuls' => [
                'required',
                'array',
                'min:1',
            ],

            'shohibuls.*.name' => [
                'required',
                'string',
                'max:255',
            ],

            'shohibuls.*.qurban_type_id' => [
                'required',
                Rule::exists('qurban_types', 'id')
                    ->where('active', true),
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'participant.name' => 'nama peserta',
            'participant.phone' => 'nomor HP',
            'participant.address' => 'alamat',
            'participant.request_part' => 'permintaan bagian',
            'participant.dist_cow' => 'jumlah kantong sapi',
            'participant.dist_goat' => 'jumlah kantong kambing',
            'participant.notes' => 'catatan',

            'shohibuls' => 'daftar shohibul',
            'shohibuls.*.name' => 'nama shohibul',
            'shohibuls.*.qurban_type_id' => 'jenis qurban',
        ];
    }
}
