
export type IFileDataReponse = {
    data: IFileData
    count: number
    status: boolean
}

interface IFileData{
    fileName: string
    filePath: string
    filesize: number
    moduleUuId: string
}