/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */

class VK {

  static ACCESS_TOKEN = '958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008';

  static lastCallback;


  /**
   * Получает изображения
   * */
  static get(id = '', callback){

    this.lastCallback = callback;

    let script = document.createElement('script');

    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${this.ACCESS_TOKEN}&v=5.154&callback=VK.processData`
    document.getElementsByTagName('body')[0].appendChild(script);

  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    document.querySelector('body').lastElementChild.remove();
    if (!result.response) {
      alert('Ошибка в HTTPS:' + result.error.error_msg);
      return;
    }
    const photoArray = result.response.items;

    const photoMaxSize = [];
    for (const photo of photoArray) {

      photoMaxSize.push(photo.sizes.at(-1).url);
    }
    VK.lastCallback(photoMaxSize);

    this.lastCallback = () => {};
  }
}




