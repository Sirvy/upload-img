<?php

declare(strict_types=1);

namespace App\Presenters\Api\Dto;

class ImageResponseDto
{
    public int $id;

    public string $filename;

    /**
     * @param int $id
     * @param string $filename
     */
    public function __construct(int $id, string $filename)
    {
        $this->id = $id;
        $this->filename = $filename;
    }


}