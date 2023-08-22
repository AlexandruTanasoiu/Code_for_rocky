let buttons = document.getElementsByTagName("button");
let btn_ids = ["key_reset", "key_equal", "key_del"];

export function theme_Function() {
  document.getElementById("theme1").addEventListener("click", function () {
    layout(null, null, null, null, null, null, null);
    keyboard(
      buttons, // ids array
      null, // keys background color
      null, // keys text color
      "#b4a597", //keys shadow color
      "#ffffff", // keys hover color
      null, // reset and del keys color
      null, // reset and del text color
      "#404e72", // reset and del shadow color
      "#a2b3e1" //reset and del hover color
    );
    equal_format(null, null, "#882821", "#f96c5b");
  });

  document.getElementById("theme2").addEventListener("click", function () {
    layout(
      "#e6e6e6", // main background color
      "#35352c", // nav text color
      "#d1cccc", // bg toogle switch color
      "#ca5502", // bullet bg color
      "#ededed", // bg calculator display color
      "#35352c", // text keyboard color
      "#d1cccc" // bg keyboard color
    );

    keyboard(
      buttons, // ids array
      "#e5e4e1", // keys background color
      "hsl(60, 10%, 19%)", // keys text color
      "hsl(35, 11%, 61%)", //keys shadow color
      "hsl(45, 7%, 95%)", // keys hover color
      "hsl(185, 42%, 37%)", // reset and del keys color
      "white", // reset and del text color
      "hsl(185, 58%, 25%)", // reset and del shadow color
      "hsl(185, 42%, 50%)" //reset and del hover color
    );

    equal_format(
      "hsl(25, 98%, 40%)", // equal key bg color
      "white", // equal key text color
      "hsl(25, 99%, 27%)", // equal key shadow color
      "hsl(25, 98%, 50%)" // equal key hover color
    );
  });

  document.getElementById("theme3").addEventListener("click", function () {
    layout(
      "hsl(268, 75%, 9%)", // main background color
      "hsl(52, 100%, 62%)", // nav text color
      "hsl(268, 71%, 12%)", // bg toogle switch color
      "hsl(176, 100%, 44%)", // bullet bg color
      "hsl(268, 71%, 12%)", // bg calculator display color
      "hsl(52, 100%, 62%)", // text keyboard color
      "hsl(268, 71%, 12%)" // bg keyboard color
    );

    keyboard(
      buttons, // ids array
      "hsl(281, 89%, 16%)", // keys background color
      "hsl(52, 100%, 62%)", // keys text color
      "hsl(285, 91%, 52%)", //keys shadow color
      "hsl(285, 91%, 65%)", // keys hover color
      "hsl(268, 47%, 21%)", // reset and del keys color
      "white", // reset and del text color
      " hsl(290, 70%, 36%)", // reset and del shadow color
      "hsl(268, 47%, 31%)" //reset and del hover color
    );

    equal_format(
      "hsl(176, 100%, 44%)", // equal key bg color
      "hsl(198, 20%, 13%)", // equal key text color
      "hsl(177, 92%, 70%)", // equal key shadow color
      "hsl(176, 100%, 55%)" // equal key hover color
    );
  });

  // this section format main, nav, toogle switch, calc disp, keyboard background
  function layout(
    main_bg_color,
    nav_text,
    bg_toogle,
    bullet_bg,
    bg_calc,
    text_calc,
    keyboard_bg
  ) {
    // format main background
    document.querySelector(".main_container").style.backgroundColor =
      main_bg_color;

    //format nav text color
    document.querySelector("nav").style.color = nav_text;

    // format toogle switch button
    document.querySelector(".nav_states").style.backgroundColor = bg_toogle;

    // format bullet background
    document.querySelector(".bullet").style.backgroundColor = bullet_bg;

    // format calculator display
    format_theme(
      document.querySelector(".main_display"),
      bg_calc,
      text_calc,
      null
    );
    // format main keyboard
    document.querySelector(".main_keyboard").style.backgroundColor =
      keyboard_bg;
  }

  // This is function for keys format
  function keyboard(
    y,
    key_bg,
    key_text,
    key_shadow,
    key_hover,
    reset_key,
    reset_text,
    reset_shadow,
    reset_hover
  ) {
    // keyboard buttons format
    for (let i of y) {
      format_theme(i, key_bg, key_text, `0 3px ${key_shadow}`);

      i.addEventListener("mouseover", function () {
        format_theme(i, key_hover);
      });

      i.addEventListener("mouseout", function () {
        format_theme(i, key_bg);
      });

      // here format del, equal, reset button
      if (btn_ids.includes(i.id)) {
        format_theme(i, reset_key, reset_text, `0 3px ${reset_shadow}`);

        i.addEventListener("mouseover", function () {
          format_theme(i, reset_hover);
        });

        i.addEventListener("mouseout", function () {
          format_theme(i, reset_key);
        });
      }
    }
  }

  function equal_format(equal_bg, equal_text, equal_shadow, equal_hover) {
    // format special keys
    format_theme(
      document.querySelector(".format_btn_equal"),
      equal_bg,
      equal_text,
      `0 3px ${equal_shadow}`
    );

    //hover efect for equal button
    document
      .querySelector(".format_btn_equal")
      .addEventListener("mouseover", function () {
        format_theme(document.querySelector(".format_btn_equal"), equal_hover);
      });

    document
      .querySelector(".format_btn_equal")
      .addEventListener("mouseout", function () {
        format_theme(
          document.querySelector(".format_btn_equal"),
          equal_bg,
          equal_text,
          `0 3px ${equal_shadow}`
        );
      });
  }

  function format_theme(x, bg, text, shadow) {
    x.style.color = text;
    x.style.backgroundColor = bg;
    x.style.boxShadow = shadow;
    x.style.cursor = "pointer";
  }
}
