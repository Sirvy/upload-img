<?php

declare(strict_types=1);

namespace App\Services;

use App\Presenters\Api\Dto\ImageResponseDto;
use App\Presenters\Api\Factory\HistogramDtoFactory;
use Nette\Http\FileUpload;
use Nette\Utils\FileSystem;
use Nette\Utils\Image;
use Nette\Utils\ImageException;
use Nette\Utils\UnknownImageFileException;

class SaveImageService
{
    /**
     * @throws ImageException
     * @throws UnknownImageFileException
     */
    public function saveImage(FileUpload $file): ImageResponseDto
    {
        if (!$file->isImage() || !$file->isOk()) {
            throw new ImageException('Not an image.');
        }

        if ($file->getSize() >= 1 * 1024 * 1024) {
            throw new ImageException('Image too large.');
        }

        $fileName = md5(date("YmdHis") . $file->getSanitizedName()) . "." . $file->getImageFileExtension();

        $image = Image::fromFile($file->getTemporaryFile());
        //$image->resize('50%', '50%');

        FileSystem::createDir('files/' . date("Ym"));

        $imageName = "files/" . date("Ym") . "/{$fileName}";

        $image->save($imageName, 80);

        return new ImageResponseDto(0, $imageName);
    }
}