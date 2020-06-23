

// utility function to generate promise for cropped DataURL
export const getCroppedImg = async (src, crop)=> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let img = new Image();
    img.src = src
    return new Promise(resolve => {
      img.onload =  ()=> {
            ctx.drawImage(img, 10, 10, 200, 180);
            const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
          ctx.drawImage(img, crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height);
            resolve(canvas.toDataURL());
         }

});
}