function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true ,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
locomotive();


const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
     ./welcome-page/male0001.png
      ./welcome-page/male0002.png
      ./welcome-page/male0003.png
      ./welcome-page/male0004.png
      ./welcome-page/male0005.png
      ./welcome-page/male0006.png
      ./welcome-page/male0007.png
      ./welcome-page/male0008.png
      ./welcome-page/male0009.png
      ./welcome-page/male0010.png
      ./welcome-page/male0011.png
      ./welcome-page/male0012.png
      ./welcome-page/male0013.png
      ./welcome-page/male0014.png
      ./welcome-page/male0015.png
      ./welcome-page/male0016.png
      ./welcome-page/male0017.png
      ./welcome-page/male0018.png
      ./welcome-page/male0019.png
      ./welcome-page/male0020.png
      ./welcome-page/male0021.png
      ./welcome-page/male0022.png
      ./welcome-page/male0023.png
      ./welcome-page/male0024.png
      ./welcome-page/male0025.png
      ./welcome-page/male0026.png
      ./welcome-page/male0027.png
      ./welcome-page/male0028.png
      ./welcome-page/male0029.png
      ./welcome-page/male0030.png
      ./welcome-page/male0031.png
      ./welcome-page/male0032.png
      ./welcome-page/male0033.png
      ./welcome-page/male0034.png
      ./welcome-page/male0035.png
      ./welcome-page/male0036.png
      ./welcome-page/male0037.png
      ./welcome-page/male0038.png
      ./welcome-page/male0039.png
      ./welcome-page/male0040.png
      ./welcome-page/male0041.png
      ./welcome-page/male0042.png
      ./welcome-page/male0043.png
      ./welcome-page/male0044.png
      ./welcome-page/male0045.png
      ./welcome-page/male0046.png
      ./welcome-page/male0047.png
      ./welcome-page/male0048.png
      ./welcome-page/male0049.png
      ./welcome-page/male0050.png
      ./welcome-page/male0051.png
      ./welcome-page/male0052.png
      ./welcome-page/male0053.png
      ./welcome-page/male0054.png
      ./welcome-page/male0055.png
      ./welcome-page/male0056.png
      ./welcome-page/male0057.png
      ./welcome-page/male0058.png
      ./welcome-page/male0059.png
      ./welcome-page/male0060.png
      ./welcome-page/male0061.png
      ./welcome-page/male0062.png
      ./welcome-page/male0063.png
      ./welcome-page/male0064.png
      ./welcome-page/male0065.png
      ./welcome-page/male0066.png
      ./welcome-page/male0067.png
      ./welcome-page/male0068.png
      ./welcome-page/male0069.png
      ./welcome-page/male0070.png
      ./welcome-page/male0071.png
      ./welcome-page/male0072.png
      ./welcome-page/male0073.png
      ./welcome-page/male0074.png
      ./welcome-page/male0075.png
      ./welcome-page/male0076.png
      ./welcome-page/male0077.png
      ./welcome-page/male0078.png
      ./welcome-page/male0079.png
      ./welcome-page/male0080.png
      ./welcome-page/male0081.png
      ./welcome-page/male0082.png
      ./welcome-page/male0083.png
      ./welcome-page/male0084.png
      ./welcome-page/male0085.png
      ./welcome-page/male0086.png
      ./welcome-page/male0087.png
      ./welcome-page/male0088.png
      ./welcome-page/male0089.png
      ./welcome-page/male0090.png
      ./welcome-page/male0091.png
      ./welcome-page/male0092.png
      ./welcome-page/male0093.png
      ./welcome-page/male0094.png
      ./welcome-page/male0095.png
      ./welcome-page/male0096.png
      ./welcome-page/male0097.png
      ./welcome-page/male0098.png
      ./welcome-page/male0099.png
      ./welcome-page/male0100.png
      ./welcome-page/male0101.png
      ./welcome-page/male0102.png
      ./welcome-page/male0103.png
      ./welcome-page/male0104.png
      ./welcome-page/male0105.png
      ./welcome-page/male0106.png
      ./welcome-page/male0107.png
      ./welcome-page/male0108.png
      ./welcome-page/male0109.png
      ./welcome-page/male0110.png
      ./welcome-page/male0111.png
      ./welcome-page/male0112.png
      ./welcome-page/male0113.png
      ./welcome-page/male0114.png
      ./welcome-page/male0115.png
      ./welcome-page/male0116.png
      ./welcome-page/male0117.png
      ./welcome-page/male0118.png
      ./welcome-page/male0119.png
      ./welcome-page/male0120.png
      ./welcome-page/male0121.png
      ./welcome-page/male0122.png
      ./welcome-page/male0123.png
      ./welcome-page/male0124.png
      ./welcome-page/male0125.png
      ./welcome-page/male0126.png
      ./welcome-page/male0127.png
      ./welcome-page/male0128.png
      ./welcome-page/male0129.png
      ./welcome-page/male0130.png
      ./welcome-page/male0131.png
      ./welcome-page/male0132.png
      ./welcome-page/male0133.png
      ./welcome-page/male0134.png
      ./welcome-page/male0135.png
      ./welcome-page/male0136.png
      ./welcome-page/male0137.png
      ./welcome-page/male0138.png
      ./welcome-page/male0139.png
      ./welcome-page/male0140.png
      ./welcome-page/male0141.png
      ./welcome-page/male0142.png
      ./welcome-page/male0143.png
      ./welcome-page/male0144.png
      ./welcome-page/male0145.png
      ./welcome-page/male0146.png
      ./welcome-page/male0147.png
      ./welcome-page/male0148.png
      ./welcome-page/male0149.png
      ./welcome-page/male0150.png
      ./welcome-page/male0151.png
      ./welcome-page/male0152.png
      ./welcome-page/male0153.png
      ./welcome-page/male0154.png
      ./welcome-page/male0155.png
      ./welcome-page/male0156.png
      ./welcome-page/male0157.png
      ./welcome-page/male0158.png
      ./welcome-page/male0159.png
      ./welcome-page/male0160.png
      ./welcome-page/male0161.png
      ./welcome-page/male0162.png
      ./welcome-page/male0163.png
      ./welcome-page/male0164.png
      ./welcome-page/male0165.png
      ./welcome-page/male0166.png
      ./welcome-page/male0167.png
      ./welcome-page/male0168.png
      ./welcome-page/male0169.png
      ./welcome-page/male0170.png
      ./welcome-page/male0171.png
      ./welcome-page/male0172.png
      ./welcome-page/male0173.png
      ./welcome-page/male0174.png
      ./welcome-page/male0175.png
      ./welcome-page/male0176.png
      ./welcome-page/male0177.png
      ./welcome-page/male0178.png
      ./welcome-page/male0179.png
      ./welcome-page/male0180.png
      ./welcome-page/male0181.png
      ./welcome-page/male0182.png
      ./welcome-page/male0183.png
      ./welcome-page/male0184.png
      ./welcome-page/male0185.png
      ./welcome-page/male0186.png
      ./welcome-page/male0187.png
      ./welcome-page/male0188.png
      ./welcome-page/male0189.png
      ./welcome-page/male0190.png
      ./welcome-page/male0191.png
      ./welcome-page/male0192.png
      ./welcome-page/male0193.png
      ./welcome-page/male0194.png
      ./welcome-page/male0195.png
      ./welcome-page/male0196.png
      ./welcome-page/male0197.png
      ./welcome-page/male0198.png
      ./welcome-page/male0199.png
      ./welcome-page/male0200.png
      ./welcome-page/male0201.png
      ./welcome-page/male0202.png
      ./welcome-page/male0203.png
      ./welcome-page/male0204.png
      ./welcome-page/male0205.png
      ./welcome-page/male0206.png
      ./welcome-page/male0207.png
      ./welcome-page/male0208.png
      ./welcome-page/male0209.png
      ./welcome-page/male0210.png
      ./welcome-page/male0211.png
      ./welcome-page/male0212.png
      ./welcome-page/male0213.png
      ./welcome-page/male0214.png
      ./welcome-page/male0215.png
      ./welcome-page/male0216.png
      ./welcome-page/male0217.png
      ./welcome-page/male0218.png
      ./welcome-page/male0219.png
      ./welcome-page/male0220.png
      ./welcome-page/male0221.png
      ./welcome-page/male0222.png
      ./welcome-page/male0223.png
      ./welcome-page/male0224.png
      ./welcome-page/male0225.png
      ./welcome-page/male0226.png
      ./welcome-page/male0227.png
      ./welcome-page/male0228.png
      ./welcome-page/male0229.png
      ./welcome-page/male0230.png
      ./welcome-page/male0231.png
      ./welcome-page/male0232.png
      ./welcome-page/male0233.png
      ./welcome-page/male0234.png
      ./welcome-page/male0235.png
      ./welcome-page/male0236.png
      ./welcome-page/male0237.png
      ./welcome-page/male0238.png
      ./welcome-page/male0239.png
      ./welcome-page/male0240.png
      ./welcome-page/male0241.png
      ./welcome-page/male0242.png
      ./welcome-page/male0243.png
      ./welcome-page/male0244.png
      ./welcome-page/male0245.png
      ./welcome-page/male0246.png
      ./welcome-page/male0247.png
      ./welcome-page/male0248.png
      ./welcome-page/male0249.png
      ./welcome-page/male0250.png
      ./welcome-page/male0251.png
      ./welcome-page/male0252.png
      ./welcome-page/male0253.png
      ./welcome-page/male0254.png
      ./welcome-page/male0255.png
      ./welcome-page/male0256.png
      ./welcome-page/male0257.png
      ./welcome-page/male0258.png
      ./welcome-page/male0259.png
      ./welcome-page/male0260.png
      ./welcome-page/male0261.png
      ./welcome-page/male0262.png
      ./welcome-page/male0263.png
      ./welcome-page/male0264.png
      ./welcome-page/male0265.png
      ./welcome-page/male0266.png
      ./welcome-page/male0267.png
      ./welcome-page/male0268.png
      ./welcome-page/male0269.png
      ./welcome-page/male0270.png
      ./welcome-page/male0271.png
      ./welcome-page/male0272.png
      ./welcome-page/male0273.png
      ./welcome-page/male0274.png
      ./welcome-page/male0275.png
      ./welcome-page/male0276.png
      ./welcome-page/male0277.png
      ./welcome-page/male0278.png
      ./welcome-page/male0279.png
      ./welcome-page/male0280.png
      ./welcome-page/male0281.png
      ./welcome-page/male0282.png
      ./welcome-page/male0283.png
      ./welcome-page/male0284.png
      ./welcome-page/male0285.png
      ./welcome-page/male0286.png
      ./welcome-page/male0287.png
      ./welcome-page/male0288.png
      ./welcome-page/male0289.png
      ./welcome-page/male0290.png
      ./welcome-page/male0291.png
      ./welcome-page/male0292.png
      ./welcome-page/male0293.png
      ./welcome-page/male0294.png
      ./welcome-page/male0295.png
      ./welcome-page/male0296.png
      ./welcome-page/male0297.png
      ./welcome-page/male0298.png
      ./welcome-page/male0299.png
      ./welcome-page/male0300.png
 `;
  return data.split("\n")[index];
}

const frameCount = 300;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page>canvas`,
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({
  trigger: "#page>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
  start: `top top`,
  end: `600% top`,
});



gsap.to("#page1",{
  scrollTrigger:{
    trigger:`#page1`,
    start:`top top`,
    end:`bottom top`,
    pin:true,
    scroller:`#main`
  }
})
gsap.to("#page2",{
  scrollTrigger:{
    trigger:`#page2`,
    start:`top top`,
    end:`bottom top`,
    pin:true,
    scroller:`#main`
  }
})
gsap.to("#page3",{
  scrollTrigger:{
    trigger:`#page3`,
    start:`top top`,
    end:`bottom top`,
    pin:true,
    scroller:`#main`
  }

  
})