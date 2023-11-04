/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.registerEvents()

  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    const close = this.element.querySelector('.x')
    const content = this.element.querySelector('.content')


    close.addEventListener('click', () => {
      App.getModal('filePreviewer').close()
    })

    content.addEventListener('click', (e) => {
      const delBtn = this.element.querySelector('.delete');
      const download = this.element.querySelector('.download');


      if (e.target.closest('.delete')) {
        delBtn.querySelector('i').classList = 'icon spinner loading'
        delBtn.classList.add('disabled')
        Yandex.removeFile(delBtn.dataset.path, (response) => {
          if (response === null) {
            delBtn.closest('.image-preview-container').remove()
          }
        })
      }

      if (e.target.closest('.download')) {

        Yandex.downloadFileByUrl(download.dataset.file)
      }
    })
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    const items  = data.items.reverse();
    let imgUpload = [];
    if (data.items.length > 0) {
      for (let img of items ) {
        console.log(img)
        imgUpload.push(this.getImageInfo(img))
      }

      this.element.querySelector('.content').innerHTML =
        imgUpload.join("");
    }
  }



  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(item) {
    const data = new Date(item.created);
    return data.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }



  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    return `<div class="image-preview-container">
      <img src=${item.file}/>
      <table class="ui celled table">
      <thead>
        <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
      </thead>
      <tbody>
        <tr><td>${item.name}</td><td>${this.formatDate(item)}</td><td>${(item.size/1024).toFixed(1)}Кб</td></tr>
      </tbody>
      </table>
      <div class="buttons-wrapper">
        <button class="ui labeled icon red basic button delete" data-path=${item.path}>
          Удалить
          <i class="trash icon"></i>
        </button>
        <button class="ui labeled icon violet basic button download" data-file=${item.file}>
          Скачать
          <i class="download icon"></i>
        </button>
      </div>
    </div>`

  }
}
