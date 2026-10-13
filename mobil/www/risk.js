/* Diyabet risk modeli (lojistik regresyon) — Python'daki boru hattının birebir JS karşılığı:
 *   1) eksik değer → eğitim medyanı   2) standartlaştırma   3) lojistik fonksiyon  */
(function (global) {
  "use strict";
  function hesapla(degerler) {
    const M = global.DIYABET_MODEL;
    let logit = M.sabit;
    const katkilar = {}, kullanilan = {};
    M.ozellikler.forEach(function (ad, i) {
      let v = degerler[ad];
      const eksik = v === null || v === undefined || v === "" || Number.isNaN(Number(v));
      v = eksik ? M.medyan[i] : Number(v);
      const z = (v - M.ortalama[i]) / M.std[i];
      katkilar[ad] = M.katsayi[i] * z;
      kullanilan[ad] = { deger: v, eksik: eksik };
      logit += katkilar[ad];
    });
    return { risk: 1 / (1 + Math.exp(-logit)), logit: logit, katkilar: katkilar, kullanilan: kullanilan };
  }
  global.DiyabetRisk = { hesapla: hesapla };
})(typeof window !== "undefined" ? window : globalThis);
