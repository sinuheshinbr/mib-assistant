const toCoordinates = (obj) => {
  let dX1;
  let dX2;
  let dX3;
  let x;
  let dY1;
  let dY2;
  let dY3;
  let y;
  let mib = obj.ancient ? "AMIB" : "MIB";
  if (obj.lngDirection.toLowerCase() === "n") {
    dY1 = Number(obj.lngMinute) / 60 + Number(obj.lngDegree);
    dY2 = (dY1 * 4096) / 360;
    dY3 = 1624 - dY2;
    if (dY3 < 0) {
      y = Math.round(4096 + dY3);
    } else {
      y = Math.round(dY3);
    }
  } else {
    dY1 = Number(obj.lngMinute) / 60 + Number(obj.lngDegree);
    dY2 = (dY1 * 4096) / 360;
    dY3 = 1624 + dY2;
    if (dY3 < 0) {
      y = Math.round(4096 + dY3);
    } else {
      y = Math.round(dY3);
    }
  }
  if (obj.latDirection.toLowerCase() === "w") {
    dX1 = Number(obj.latMinute) / 60 + Number(obj.latDegree);
    dX2 = (dX1 * 5120) / 360;
    dX3 = 1323 - dX2;
    if (dX3 < 0) {
      x = Math.round(5120 + dX3);
    } else {
      x = Math.round(dX3);
    }
  } else {
    dX1 = Number(obj.latMinute) / 60 + Number(obj.latDegree);
    dX2 = (dX1 * 5120) / 360;
    dX3 = 1323 + dX2;
    if (dX3 < 0) {
      x = Math.round(5120 + dX3);
    } else {
      x = Math.round(dX3);
    }
  }
  return `+${mib}: ${x} ${y} 0 x`;
};

export default toCoordinates;
