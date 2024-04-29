const uppercaseList = (() => {
    const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
    return caps;
  })();
  
  const numbersList = (() => {
    const caps = [...Array(10)].map((val, i) => String.fromCharCode(i + 48));
    return caps;
  })();
  
  const symbolsList = "!@#$%^&*()-_+=~`[]{}|;:',.<>?";
  
  const lowerCaseList = uppercaseList.map((values) => values.toLowerCase());
  
  export const generatePassword = async (req, res) => {
    try {
      const { lower, upper, number, symbols, passwordLength } = req.body;
  
      let charSet = [];
      if (lower) charSet = charSet.concat(lowerCaseList);
      if (upper) charSet = charSet.concat(uppercaseList);
      if (number) charSet = charSet.concat(numbersList);
      if (symbols) charSet = charSet.concat(symbolsList.split(""));
  
      let password = "";
      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
      }
  
      return res
        .status(200)
        .json({ genarate: true, password, message: "Password genarator" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ genarate: false, message: "Internal Server Error" });
    }
  };
  