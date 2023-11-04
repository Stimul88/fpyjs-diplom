/**
 * Класс Yandex.
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken() {
    // localStorage.setItem('yaToken', '')
    // console.log(createRequest)

    // createRequest()

    const yaTokenLocal = localStorage.getItem('yaToken')
    if (yaTokenLocal === 'null' || yaTokenLocal === '') {
      let yaToken = prompt('Введите токен Яндекс API')
      // if (yaToken)
      localStorage.setItem('yaToken', yaToken)
    }
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    createRequest({
      method: "POST",
      url: "/resources/upload",
      // data: { way: path, url: url },
      headers: {
        Authorization: `OAuth ${localStorage.getItem("yaToken")}`,
      },
      callback: callback,
    });
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    createRequest({
      method: "DELETE",
      url: "/resources",
      data: { path: path },
      headers: {
        Authorization: `OAuth ${localStorage.getItem("yaToken")}`,
      },
      callback: callback,
    });
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    createRequest({
      method: "GET",
      // url: "/resources/files?limit =1000&media_type=image",
      url: "/resources/files",
      data: { mediaType: "image", limit: 1000 },
      headers: {
        Authorization: `OAuth ${localStorage.getItem("yaToken")}`,
      },
      callback: callback,
    }); 
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    console.log(url)
    const link = document.createElement('a')
    link.href = url;
    link.click();
  }
}
