/**
 * Класс BaseModal.
 * Используется как базовый класс всплывающего окна
 */
class BaseModal {
  constructor( element ) {
    this.element = element[0]
  }

  /**
   * Открывает всплывающее окно
   */
  open() {
    $(`.ui.modal.${this.element.classList[2]}`).modal("show");
  }

  /**
   * Закрывает всплывающее окно
   */
  close() {
    $(`.ui.modal.${this.element.classList[2]}`).modal("hide");
  }
}