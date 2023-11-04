/**
 * Класс ImageViewer.
 * Используется для взаимодействия с блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element;
    this.previewImg = this.element.querySelector('.image')
    this.allImage = this.element.querySelector('.row')
    this.registerEvents()
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    const selectAllBtn = this.element.querySelector('.select-all')
    const showLoadedBtn  = this.element.querySelector('.show-uploaded-files')
    const uploadBtn = this.element.querySelector('.send')

    this.allImage.addEventListener("dblclick", (event) => {
      if (event.target.tagName.toLowerCase() === "img") {
        this.previewImg.src = event.target.src
      }
    });

    this.allImage.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "img") {
        event.target.classList.toggle('selected')
      }
      this.checkButtonText()
    })

    selectAllBtn.addEventListener("click", (event) => {
      const img = Array.from(this.allImage.querySelectorAll('img'))
      let count = 0;
      img.forEach((item) => {
        if (item.classList.contains('selected')) {
          item.classList.remove('selected')
        } else {
          count++
          if (count === img.length){
            img.forEach((j) => {j.classList.add('selected') })
          }
        }
      })
      this.checkButtonText()
    })

    showLoadedBtn.addEventListener("click", () => {
      App.getModal("filePreviewer").open();


      Yandex.getUploadedFiles((json) => {
        App.getModal('filePreviewer').showImages(json);
      });

    })

    uploadBtn.addEventListener("click", () => {
      App.getModal('fileUploader').open();
    })
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    const allImage = App.imageViewer.element.querySelector('.row')
    allImage.innerHTML = '';
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    const allImage = App.imageViewer.element.querySelector('.row')
    if (images.length > 0) {
      App.imageViewer.element.querySelector('.select-all').classList.remove('disabled')
    } else {
      App.imageViewer.element.querySelector('.select-all').classList.add('disabled')
      return;
    }
    for (let image of images) {
      const addImg = `<div class='four wide column ui medium image-wrapper'><img src="${image}"/></div>`;
      allImage.insertAdjacentHTML('beforeend', addImg)
    }
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    const img = this.allImage.querySelectorAll('img')
    const selectAll = App.imageViewer.element.querySelector('.select-all')
    const send = App.imageViewer.element.querySelector('.send')
    let count = 0
    for (let i of img) {
      if (i.className === 'selected') {
        count++
        if (count === img.length) {
          selectAll.textContent = 'Снять выделение'
        }
      } else {
        selectAll.textContent = 'Выбрать всё'
      } if (count > 0) {
        send.classList.remove('disabled')
      } else {
        send.classList.add('disabled')
      }
    }
  }
}