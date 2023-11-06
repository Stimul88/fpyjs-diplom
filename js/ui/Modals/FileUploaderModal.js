/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.registerEvents()
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){

    const closeSend = this.element.querySelector('.x')
    const closeSendBtn = this.element.querySelector('.close')
    const allSendBtn = this.element.querySelector('.send-all')
    const sendBtn = this.element.querySelector('.content')

    closeSend.addEventListener('click', () => {
      App.getModal('fileUploader').close()
    })

    closeSendBtn.addEventListener('click', () => {
      App.getModal('fileUploader').close()
    })

    allSendBtn.addEventListener('click', () => {
     this.sendAllImages()
    })

    sendBtn.addEventListener('click', (e) => {
      const input = e.target.closest('.input')
      if (input){
        input.classList.remove('error')
      } if (e.target.classList.contains('button') ||
          e.target.closest('button') ){
          this.sendImage(e.target.closest('.image-preview-container'))
      }
    })
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    const items  = images.reverse();
    let imgUpload = [];
    if (images.length > 0) {
      for (let img of items ) {
        if (img) {
          imgUpload.push(this.getImageHTML(img.src))
        }
      }
      this.element.querySelector('.content').innerHTML =
        imgUpload.join("");
    }
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    return `<div class="image-preview-container">
              <img src=${item} />
              <div class="ui action input">
                <input type="text" placeholder="Путь к файлу">
                <button class="ui button"><i class="upload icon"></i></button>
              </div>
            </div>`

  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    const imgBlockArray = Array.from(this.element.querySelectorAll('.image-preview-container'))
    imgBlockArray.forEach((item) => {
      this.sendImage(item)
    })

  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    const scrollingBlockArray = this.element.querySelector('.scrolling')
    const inputWay = imageContainer.querySelector('input')
    const link = imageContainer.querySelector('img').src
    const way = inputWay.value

    if(way.trim() === '') {
      inputWay.parentElement.classList.add('error')
      return;
    }
    inputWay.classList.add('disabled')

    Yandex.uploadFile(way, link, (response) => {
      if(response) {
        imageContainer.remove()
      }
      if(scrollingBlockArray.children.length === 0) {
        App.getModal('fileUploader').close()
      }
    })
  }
}