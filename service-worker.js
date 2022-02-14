/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "1578556596.html",
    "revision": "c6ec9506bd6d21bac8179dafc5770605"
  },
  {
    "url": "1578558414.html",
    "revision": "79705d87e867659e8361f1dc33091198"
  },
  {
    "url": "1578558465.html",
    "revision": "14c777952c58815a40d8c077f90164f1"
  },
  {
    "url": "1578558484.html",
    "revision": "12f174517de98bd843c7657f736db0c0"
  },
  {
    "url": "1578558505.html",
    "revision": "9dba571fdc009df560ae7fe48ffce1ab"
  },
  {
    "url": "1578558525.html",
    "revision": "01a77f3124ac16945059f934e572f299"
  },
  {
    "url": "1586156313.html",
    "revision": "1d628fa7033864be00a0e80b4a54b726"
  },
  {
    "url": "1587113556.html",
    "revision": "0464e0f02cbeac7a51639c65b04645c3"
  },
  {
    "url": "1587452515.html",
    "revision": "2081400634c41f344f0a5c5bf721dc96"
  },
  {
    "url": "1587972892.html",
    "revision": "725d749a8a1e6e19142e0f43754c55ec"
  },
  {
    "url": "1589266724.html",
    "revision": "700443794562bb8f9dc349b9aae6250a"
  },
  {
    "url": "1589790806.html",
    "revision": "b333724bc821e33787780b758287a1e0"
  },
  {
    "url": "1590387317.html",
    "revision": "d50e2ee11f22ad4d33dd1b6f9180446a"
  },
  {
    "url": "1591067106.html",
    "revision": "eba96ed247c590504f03c2f234f57ff1"
  },
  {
    "url": "1591863286.html",
    "revision": "c5ac6e8adada3fba12aabf15922eebbd"
  },
  {
    "url": "1593847540.html",
    "revision": "da334c69d91325c554d3cebddd8cf9e5"
  },
  {
    "url": "1594612749.html",
    "revision": "8d53a56d96f3d4e907fa16a3b946e3de"
  },
  {
    "url": "1595057571.html",
    "revision": "0bfb0149526758ae3930930bf1744156"
  },
  {
    "url": "1595321435.html",
    "revision": "9be4b6435ea25899e5b82a24a20a6383"
  },
  {
    "url": "1595771964.html",
    "revision": "91ded8f5b2dff1275e45fab5d53aa04e"
  },
  {
    "url": "1596868729.html",
    "revision": "82e5934c00503f557dd5bed308878dca"
  },
  {
    "url": "1602941123.html",
    "revision": "ea258c512b48d0fc6236ee7b1a5ecd06"
  },
  {
    "url": "1608271946.html",
    "revision": "f1af1bd2b52b38a4b5658df48b2f6bd7"
  },
  {
    "url": "1608357895.html",
    "revision": "aec04677bc5af1461fa6cce10a5205d8"
  },
  {
    "url": "1618797504.html",
    "revision": "1d768b10dbc23e47ba1c7ac2d8411511"
  },
  {
    "url": "1630720410.html",
    "revision": "9cacc348a982245931dfb9fcb41377b0"
  },
  {
    "url": "1630997877.html",
    "revision": "89d8f58be375029c8c0e523e247e8eda"
  },
  {
    "url": "1631154425.html",
    "revision": "5fb1b1e3f7ef207e55490bb869a2a02a"
  },
  {
    "url": "1633586487.html",
    "revision": "3fd7ca167f4ac03ae616e21e321ef204"
  },
  {
    "url": "1634692106.html",
    "revision": "fbe2f7d6e0dfe1563421da9ae99daf8f"
  },
  {
    "url": "1635298447.html",
    "revision": "642d057ded907d621f0bccef94e2e51b"
  },
  {
    "url": "1635738089.html",
    "revision": "a69982cce1c9f6f8759500318bc50021"
  },
  {
    "url": "1641539280.html",
    "revision": "9df29910b3d65e8731e09c8c6db3bc4c"
  },
  {
    "url": "1644842636.html",
    "revision": "fdf7476b54c4cc6d9ac8b8634cae8132"
  },
  {
    "url": "404.html",
    "revision": "bd434f101659bb32e1a947d7a2de8e46"
  },
  {
    "url": "assets/css/0.styles.fb6f48a0.css",
    "revision": "82760654075afbecf79a3fc4d1cebf79"
  },
  {
    "url": "assets/fonts/KaTeX_AMS-Regular.10824af7.woff",
    "revision": "10824af77e9961cfd548c8a458f10851"
  },
  {
    "url": "assets/fonts/KaTeX_AMS-Regular.56573229.ttf",
    "revision": "56573229753fad48910bda2ea1a6dd54"
  },
  {
    "url": "assets/fonts/KaTeX_AMS-Regular.66c67820.woff2",
    "revision": "66c678209ce93b6e2b583f02ce41529e"
  },
  {
    "url": "assets/fonts/KaTeX_Caligraphic-Bold.497bf407.ttf",
    "revision": "497bf407c4c609c6cf1f1ad38f437f7f"
  },
  {
    "url": "assets/fonts/KaTeX_Caligraphic-Regular.e6fb499f.ttf",
    "revision": "e6fb499fc8f9925eea3138cccba17fff"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Bold.40934fc0.woff",
    "revision": "40934fc076960bb989d590db044fef62"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Bold.796f3797.woff2",
    "revision": "796f3797cdf36fcaea18c3070a608378"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Bold.b9d7c449.ttf",
    "revision": "b9d7c4497cab3702487214651ab03744"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Regular.97a699d8.ttf",
    "revision": "97a699d83318e9334a0deaea6ae5eda2"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Regular.e435cda5.woff",
    "revision": "e435cda5784e21b26ab2d03fbcb56a99"
  },
  {
    "url": "assets/fonts/KaTeX_Fraktur-Regular.f9e6a99f.woff2",
    "revision": "f9e6a99f4a543b7d6cad1efb6cf1e4b1"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Bold.4cdba646.woff",
    "revision": "4cdba6465ab9fac5d3833c6cdba7a8c3"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Bold.8e431f7e.ttf",
    "revision": "8e431f7ece346b6282dae3d9d0e7a970"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Bold.a9382e25.woff2",
    "revision": "a9382e25bcf75d856718fcef54d7acdb"
  },
  {
    "url": "assets/fonts/KaTeX_Main-BoldItalic.52fb39b0.ttf",
    "revision": "52fb39b0434c463d5df32419608ab08a"
  },
  {
    "url": "assets/fonts/KaTeX_Main-BoldItalic.5f875f98.woff",
    "revision": "5f875f986a9bce1264e8c42417b56f74"
  },
  {
    "url": "assets/fonts/KaTeX_Main-BoldItalic.d8737343.woff2",
    "revision": "d873734390c716d6e18ff3f71ac6eb8b"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Italic.39349e0a.ttf",
    "revision": "39349e0a2b366f38e2672b45aded2030"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Italic.65297062.woff2",
    "revision": "652970624cde999882102fa2b6a8871f"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Italic.8ffd28f6.woff",
    "revision": "8ffd28f6390231548ead99d7835887fa"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Regular.818582da.ttf",
    "revision": "818582dae57e6fac46202cfd844afabb"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Regular.f1cdb692.woff",
    "revision": "f1cdb692ee31c10b37262caffced5271"
  },
  {
    "url": "assets/fonts/KaTeX_Main-Regular.f8a7f19f.woff2",
    "revision": "f8a7f19f45060f7a177314855b8c7aa3"
  },
  {
    "url": "assets/fonts/KaTeX_Math-BoldItalic.1320454d.woff2",
    "revision": "1320454d951ec809a7dbccb4f23fccf0"
  },
  {
    "url": "assets/fonts/KaTeX_Math-BoldItalic.48155e43.woff",
    "revision": "48155e43d9a284b54753e50e4ba586dc"
  },
  {
    "url": "assets/fonts/KaTeX_Math-BoldItalic.6589c4f1.ttf",
    "revision": "6589c4f1f587f73f0ad0af8ae35ccb53"
  },
  {
    "url": "assets/fonts/KaTeX_Math-Italic.d8b7a801.woff2",
    "revision": "d8b7a801bd87b324efcbae7394119c24"
  },
  {
    "url": "assets/fonts/KaTeX_Math-Italic.ed7aea12.woff",
    "revision": "ed7aea12d765f9e2d0f9bc7fa2be626c"
  },
  {
    "url": "assets/fonts/KaTeX_Math-Italic.fe5ed587.ttf",
    "revision": "fe5ed5875d95b18c98546cb4f47304ff"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Bold.0e897d27.woff",
    "revision": "0e897d27f063facef504667290e408bd"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Bold.ad546b47.woff2",
    "revision": "ad546b4719bcf690a3604944b90b7e42"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Bold.f2ac7312.ttf",
    "revision": "f2ac73121357210d91e5c3eaa42f72ea"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Italic.e934cbc8.woff2",
    "revision": "e934cbc86e2d59ceaf04102c43dc0b50"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Italic.ef725de5.woff",
    "revision": "ef725de572b71381dccf53918e300744"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Italic.f60b4a34.ttf",
    "revision": "f60b4a34842bb524b562df092917a542"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Regular.1ac3ed6e.woff2",
    "revision": "1ac3ed6ebe34e473519ca1da86f7a384"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Regular.3243452e.ttf",
    "revision": "3243452ee6817acd761c9757aef93c29"
  },
  {
    "url": "assets/fonts/KaTeX_SansSerif-Regular.5f8637ee.woff",
    "revision": "5f8637ee731482c44a37789723f5e499"
  },
  {
    "url": "assets/fonts/KaTeX_Script-Regular.a189c37d.ttf",
    "revision": "a189c37d73ffce63464635dc12cbbc96"
  },
  {
    "url": "assets/fonts/KaTeX_Script-Regular.a82fa2a7.woff",
    "revision": "a82fa2a7e18b8c7a1a9f6069844ebfb9"
  },
  {
    "url": "assets/fonts/KaTeX_Size1-Regular.0d8d9204.ttf",
    "revision": "0d8d9204004bdf126342605f7bbdffe6"
  },
  {
    "url": "assets/fonts/KaTeX_Size2-Regular.1fdda0e5.ttf",
    "revision": "1fdda0e59ed35495ebac28badf210574"
  },
  {
    "url": "assets/fonts/KaTeX_Size4-Regular.27a23ee6.ttf",
    "revision": "27a23ee69999affa55491c7dab8e53bf"
  },
  {
    "url": "assets/fonts/KaTeX_Typewriter-Regular.0e046058.woff",
    "revision": "0e0460587676d22eae09accd6dcfebc6"
  },
  {
    "url": "assets/fonts/KaTeX_Typewriter-Regular.6bf42875.ttf",
    "revision": "6bf4287568e1d3004b54d5d60f9f08f9"
  },
  {
    "url": "assets/fonts/KaTeX_Typewriter-Regular.b8b8393d.woff2",
    "revision": "b8b8393d2e65fcebda5fa99fa3264f41"
  },
  {
    "url": "assets/img/danger-dark.7b1d6aa1.svg",
    "revision": "7b1d6aa1bdcf013d0edfe316ab770f8e"
  },
  {
    "url": "assets/img/danger.b143eda2.svg",
    "revision": "b143eda243548a9982491dca4c81eed5"
  },
  {
    "url": "assets/img/info-dark.f8a43cf6.svg",
    "revision": "f8a43cf67fa96a27a078530a3a43253c"
  },
  {
    "url": "assets/img/info.88826912.svg",
    "revision": "88826912d81d91c9e2d03164cd1481a1"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/tip-dark.075a244c.svg",
    "revision": "075a244c83d1403c167defe81b4d7fe7"
  },
  {
    "url": "assets/img/tip.a2b80aa5.svg",
    "revision": "a2b80aa50b769a26da12fe352322a657"
  },
  {
    "url": "assets/img/warning-dark.aac7e30c.svg",
    "revision": "aac7e30c5fafc6748e21f7a9ef546698"
  },
  {
    "url": "assets/img/warning.ec428b6d.svg",
    "revision": "ec428b6d6d45ac5d0c610f08d757f40f"
  },
  {
    "url": "assets/js/10.71bc8335.js",
    "revision": "ee06d80f963b82baf5cbbf20b828885a"
  },
  {
    "url": "assets/js/11.a5ba898e.js",
    "revision": "44ee7759cecf1a06dd66c76732ee9e80"
  },
  {
    "url": "assets/js/12.433c2775.js",
    "revision": "6432df7e9eb5ea7d34015bda5175901e"
  },
  {
    "url": "assets/js/13.7eb0bb83.js",
    "revision": "dccd439f5600f86ef5a22e25f427f2fa"
  },
  {
    "url": "assets/js/14.f94790b8.js",
    "revision": "e79658c587361548d4253a267192c494"
  },
  {
    "url": "assets/js/15.40af23c2.js",
    "revision": "19e37650d6e6dcc54f584cf82923b399"
  },
  {
    "url": "assets/js/16.675630b9.js",
    "revision": "d1360198d608a8a9bc290ae116f2ad12"
  },
  {
    "url": "assets/js/17.ef69ed44.js",
    "revision": "5bc2c782f220dac7b5cc3dc9ef8be934"
  },
  {
    "url": "assets/js/18.951f9ddc.js",
    "revision": "8a4619ca4747d390209d4df7e34dfb7c"
  },
  {
    "url": "assets/js/19.f7b74fa4.js",
    "revision": "baac940a5d780b7709c69fae498e2c42"
  },
  {
    "url": "assets/js/2.21f8d596.js",
    "revision": "bf738da58a0e058709a3213a9543b5bb"
  },
  {
    "url": "assets/js/20.082be24c.js",
    "revision": "2e560e0001458d0f37663c33ce5b077b"
  },
  {
    "url": "assets/js/21.7b8301a3.js",
    "revision": "9b40a7da1d4a9c7babaf19042396d40a"
  },
  {
    "url": "assets/js/22.ce80fbaf.js",
    "revision": "1e84594fd0de485cb5f2cc11901c86f4"
  },
  {
    "url": "assets/js/23.c75defd5.js",
    "revision": "da580ba5e5642104226d1f7cb5a2b447"
  },
  {
    "url": "assets/js/24.d9218076.js",
    "revision": "e7292147612c2fb2cdef2a11acea78df"
  },
  {
    "url": "assets/js/25.1e807338.js",
    "revision": "34d3caa9bb6c8a350ebec0d1d2d3346b"
  },
  {
    "url": "assets/js/26.1572ad5f.js",
    "revision": "869712ef72d027c81fbc8d31a9ebdead"
  },
  {
    "url": "assets/js/27.087b1532.js",
    "revision": "f341f44d056ea3d2122d54f16bac4834"
  },
  {
    "url": "assets/js/28.30431ded.js",
    "revision": "4e8ee5e14e72c11d74882b98f59fcdd5"
  },
  {
    "url": "assets/js/29.5eaf33b2.js",
    "revision": "b908d0044d2ed95a34be9a3656bbafba"
  },
  {
    "url": "assets/js/3.d5ece547.js",
    "revision": "dffef3dba4a37e50cc8e6d7fbf642fef"
  },
  {
    "url": "assets/js/30.fd277774.js",
    "revision": "925dfad7a03d5462fc49b0309f0f4ed3"
  },
  {
    "url": "assets/js/31.851efea0.js",
    "revision": "328328526059d5bc895458e602833ff2"
  },
  {
    "url": "assets/js/32.8583e02a.js",
    "revision": "5d3ea4992d566575bbfd621cb6ef48a9"
  },
  {
    "url": "assets/js/33.a79f55ed.js",
    "revision": "1ebfd3e3392233ec71906d64c5664a41"
  },
  {
    "url": "assets/js/34.f7c257b4.js",
    "revision": "679f0e6b93b35a4c9ddc003e17e07a6e"
  },
  {
    "url": "assets/js/35.898ebed2.js",
    "revision": "a22345fba9072dce1d1a24956fe79643"
  },
  {
    "url": "assets/js/36.cee08c0c.js",
    "revision": "8b13c87c05144ed7b3ec1947158a8442"
  },
  {
    "url": "assets/js/37.7dfbbac6.js",
    "revision": "977511c5e7146e7597f2e92df4c4090c"
  },
  {
    "url": "assets/js/38.6da7859e.js",
    "revision": "4ac343c26774b192657e521087044aa9"
  },
  {
    "url": "assets/js/39.077ff5de.js",
    "revision": "20afc0f54649356ce652d8639f3ef0df"
  },
  {
    "url": "assets/js/4.49e28621.js",
    "revision": "df370e1b5636390fa2380d4ceff825d6"
  },
  {
    "url": "assets/js/40.108f881a.js",
    "revision": "ef502ace69e732b7357d3dfb4bcd77fa"
  },
  {
    "url": "assets/js/41.253d7dae.js",
    "revision": "42b9ce55d591012f8c817264ef0ceee2"
  },
  {
    "url": "assets/js/42.0e8b5558.js",
    "revision": "283eefa08cc2179f2809557efb3436cd"
  },
  {
    "url": "assets/js/43.d66f08e8.js",
    "revision": "ffefa08ecfe76bec5525e6ba9f6013b4"
  },
  {
    "url": "assets/js/44.b2fc1d0b.js",
    "revision": "f6476eb6268356a4703c0a67af2e7cef"
  },
  {
    "url": "assets/js/45.9a4e448e.js",
    "revision": "ed638362a6bd445b3d1725608b2cf2bc"
  },
  {
    "url": "assets/js/46.368b5092.js",
    "revision": "4fb1fb6c2364fd862cf7ff2a71cce9bb"
  },
  {
    "url": "assets/js/47.dec292e2.js",
    "revision": "efce2f8e0dc0c3740f9d8e8d5296aae9"
  },
  {
    "url": "assets/js/48.1e66cfb1.js",
    "revision": "4c03cd03fd7a6ba0fc8a578d13f75d96"
  },
  {
    "url": "assets/js/49.253a0d2c.js",
    "revision": "d7040162c928dd1828f6d89f871f5daf"
  },
  {
    "url": "assets/js/5.9a61750e.js",
    "revision": "038d0045d90cf12a0a441fd2b6fb2d0f"
  },
  {
    "url": "assets/js/50.3d3b1020.js",
    "revision": "571421121f73f37771b549d396ced6ac"
  },
  {
    "url": "assets/js/51.50155805.js",
    "revision": "80319c76890a865a326652805ed994d5"
  },
  {
    "url": "assets/js/52.1068156c.js",
    "revision": "552455aa3085463d4e0feda2610bf846"
  },
  {
    "url": "assets/js/53.3e704772.js",
    "revision": "d8b127da93015bb33bb2763c7b6b3caa"
  },
  {
    "url": "assets/js/54.76e7c82c.js",
    "revision": "4a62ca34c482618af94b270065b3f7b9"
  },
  {
    "url": "assets/js/55.c8b15bef.js",
    "revision": "704f786c7514304e6b6c740a87099551"
  },
  {
    "url": "assets/js/56.d6c59378.js",
    "revision": "2176c413e4732a151e45348719bb342c"
  },
  {
    "url": "assets/js/6.991f2325.js",
    "revision": "46e91ea16cdf5056444685fca64fc902"
  },
  {
    "url": "assets/js/7.62a8b38d.js",
    "revision": "543ef0d4f0e909dd39ca91b425d2d2f9"
  },
  {
    "url": "assets/js/8.30c2b28c.js",
    "revision": "8a98ef729378f3746f6d84401414d0f4"
  },
  {
    "url": "assets/js/9.c67ee168.js",
    "revision": "572cf61485730ef78cf48d491666aeb3"
  },
  {
    "url": "assets/js/app.75eef9bd.js",
    "revision": "49dd244796f0e2eaf564cf801a739635"
  },
  {
    "url": "category/algorithm/index.html",
    "revision": "444a6ef1362a9745279b06c62619e6c3"
  },
  {
    "url": "category/docker/index.html",
    "revision": "3aeb6a22acba9405feb1f628b2721816"
  },
  {
    "url": "category/dotnet/index.html",
    "revision": "ff928bd7a796a39d258cb2c81a148401"
  },
  {
    "url": "category/java/index.html",
    "revision": "f759b0f513dd51a682774f2a6dc32534"
  },
  {
    "url": "category/js/index.html",
    "revision": "491f085f0c6781fa1b2762daf7e2fa42"
  },
  {
    "url": "category/linux/index.html",
    "revision": "c85e9cbcef3622ad784492a56a3f82d4"
  },
  {
    "url": "category/spring/index.html",
    "revision": "8e62e18d196e9675143bfbfedf5f11aa"
  },
  {
    "url": "hero.png",
    "revision": "68bdde9c29110750b1902d2f5e943f32"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "daa6cf0bfe588f55196e07eb72179d6b"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "13daa83b0b905aa1ef1ae5f1030f74a4"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "f814694ef6aab597c94b5f0703059c98"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "084cbf748e353e17359b2845a7ea06b5"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "1b76d2cdb6021df4df0fdb1233c417ae"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "790cddfec94400ec665753a0b4bef2df"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "157cb266e2e69975059e683a594e034a"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "8a6383403e59c606ffcb27d51b122e20"
  },
  {
    "url": "index.html",
    "revision": "b59507d19fde1515e93e221b9f0e2daa"
  },
  {
    "url": "logo.png",
    "revision": "ec33060f77d85984f2a25c10bab8a6ba"
  },
  {
    "url": "otherthing/index.html",
    "revision": "3a8ab84a34ff55afdf778467d495ddf4"
  },
  {
    "url": "random.html",
    "revision": "fa10a5fa9914978f4b29e23233a67a8c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
