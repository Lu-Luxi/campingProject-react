//引入全部圖片
class IMGPath {
  importAll(r) {
    let images = {};

    r.keys().map((item, index) => (images[item.replace("./", "")] = r(item).default));
    
    return(images);
  }
}

export default IMGPath