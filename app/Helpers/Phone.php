<?php

namespace App\Helpers;

class Phone
{
    public static function normalize(string $phone): string
    {
        $phone = preg_replace('/\D+/', '', $phone);

        if (str_starts_with($phone, '62')) {
            return '0' . substr($phone, 2);
        }

        if (str_starts_with($phone, '8')) {
            return '0' . $phone;
        }

        return $phone;
    }
}
