

function isNumeric(obj) {

    console.log("parseFloat(obj)",parseFloat(obj));
    console.log("Number(obj)",Number(obj));
    return !Number.isNaN(parseFloat(obj))
      && Number.isFinite(Number(obj));

  }

  console.log(isNumeric('Infinity'));
