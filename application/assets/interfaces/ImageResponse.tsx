export function isImageResponseInterface(object: any): object is ImageResponseInterface {
    return typeof object === 'object' && 'id' in object && 'filename' in object;
}
export function isExceptionResponseInterface(object: any): object is ExceptionResponseInterface {
    return typeof object === 'object' && 'exception' in object;
}

export interface ImageResponseInterface {
    id: number,
    filename: string
}

export interface ExceptionResponseInterface {
    exception: string
}