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



    closeSend.addEventListener('click', () => {
      App.getModal('fileUploader').close()
    })

    closeSendBtn.addEventListener('click', () => {
      App.getModal('fileUploader').close()
    })
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {

  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {

  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {

  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {

  }
}