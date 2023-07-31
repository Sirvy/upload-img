<?php

namespace App\Presenters\Api;

use App\Services\SaveImageService;
use JetBrains\PhpStorm\NoReturn;
use Nette\Application\AbortException;
use Nette\FileNotFoundException;
use Nette\Http\FileUpload;
use Nette\Utils\ImageException;
use Nette\Utils\UnknownImageFileException;

class UploadPresenter extends AbstractApiPresenter
{
    public function __construct(
        private readonly SaveImageService $saveImageService,
    )
    {
        parent::__construct();
    }

    /**
     * @throws AbortException
     */
    #[NoReturn] protected function handlePost(): void
    {
        $files = $this->getRequest()->getFiles();

        if (count($files) === 0) {
            throw new FileNotFoundException('No File');
        }

        /** @var FileUpload $file */
        $file = reset($files);

        try {
            $result = $this->saveImageService->saveImage($file);
        } catch (\Exception $e) {
            $this->sendJson(['exception' => $e->getMessage()]);
        }

        $this->sendJson($result);
    }
}