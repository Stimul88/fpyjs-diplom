/**
 * Класс SearchBlock.
 * Используется для взаимодействия со строкой ввода и поиска изображений
 * */

class SearchBlock {
  constructor( element ) {
    this.element = element;
    this.btnReplace = this.element.querySelector('.replace');
    this.btnAdd = this.element.querySelector('.add');
    this.inputEl = this.element.querySelector('input');
    this.registerEvents()
  }


  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */


  registerEvents(){
    this.btnReplace.addEventListener('click', (e) => {
      e.preventDefault()
      App.imageViewer.clear()
      let getInputEl = this.inputEl.value

      if(getInputEl) {
        VK.get(getInputEl, App.imageViewer.drawImages)
      }
      this.inputEl.value = ''
    })
    this.btnAdd.addEventListener('click', (e) => {
      e.preventDefault()
      let getInputEl = this.inputEl.value

      if(getInputEl) {
        VK.get(getInputEl, App.imageViewer.drawImages)
      }
      this.inputEl.value = ''
    })

  }
}