// JavaScript Document

var bandarr_24g = ['20', '40', 'Auto'];
var bandarr_5g = ['20', '40', '80'];
var netmode_24g = ['bg', 'b', 'g', 'bgn'];
var netmode_5g = ['a', 'ac', 'an'];
var countryCode = {
    /* "AR": {
        name: _("Argentina"),
        channel: [],
        channel_5g: {
            "20": [0, 56, 60, 64, 149, 153, 157, 161],
            "40": ["0", "56u", "60l", "64u", "149l", "153u", "157l", "161u"]
        }
    },
    "AM": {
        name: _("Armenia"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64]
        }
    }, */
    "AU": {
        name: _("Australia"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "120u", "128u", "132l", "136u", "140l", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 132, 136, 140, 144, 149, 153, 157, 161]
        }
    },
    /* "AT": {
        name: _("Austria"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    },
    "BE": {
        name: _("Belgium"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    }, */
    "BR": {
        name: _("Brazil"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "120u", "128u", "132l", "136u", "140l", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 149, 153, 157, 161]
        }
    },
    /* "BG": {
        name: _("Bulgaria"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "149l", "153u", "157l", "161u"]
        }
    }, */
    "CA": {
        name: _("Canada"),
        channel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128,
                132, 136, 140, 144, 149, 153, 157, 161, 165
            ],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u", "140l", "144u", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 149, 153, 157, 161]
        }
    },
    /* "CL": {
        name: _("Chile"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161]
        }
    }, */
    "CN": {
        name: _("China"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "149l", "153u", " 157l", "161u"],
            "80": [0, 36, 40, 44, 48, 149, 153, 157, 161]
        }
    },
    /* "CO": {
        name: _("Colombia"),
        channel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161]
        }
    },
    "CZ": {
        name: _("CzechRepublic"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    },
    "DK": {
        name: _("Denmark"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    },
    "EG": {
        name: _("Egypt"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u"]
        }
    }, */
    "GB": {
        name: _("England"),
        channel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128]
        }
    },
    /* "EE": {
        name: _("Estonia"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    },
    "FI": {
        name: _("Finland"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    }, */
    "FR": {
        name: _("France"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128]
        }
    },
    "DE": {
        name: _("Germany"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128]
        }
    },
    /* "GR": {
        name: _("Greece"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    }, */
    "HK": {
        name: _("Hong Kong"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112,
                116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161, 165
            ],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "120u", "128u", "132l", "136u", "140l", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161]
        }
    },
    "IN": {
        name: _("India"),
        channel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161]
        }
    },
    "ID": {
        name: _("Indonesia"),
        channel: [],
        channel_5g: {
            "20": [0, 149, 153, 157, 161],
            "40": ["0", "149l", "153u", "157l", "161u"],
            "80": [0, 149, 153, 157, 161]
        }
    },
    /* "IQ": {
        name: _("Iraq"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    },
    "IL": {
        name: _("Israel"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u"]
        }
    },
    "IT": {
        name: _("Italy"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    }, */
    "KR": {
        name: _("Korea Republic"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u",
                "108l", "112u,", "149l", "153u", "157l", "161u"
            ],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 149, 153, 157, 161]
        }
    },
    /* "LV": {
        name: _("Latvia"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    },
    "MY": {
        name: _("Malaysia"),
        channel: [],
        channel_5g: {
            "20": [0, 52, 56, 60, 64, 149, 153, 157, 161, 165],
            "40": ["0", "52l", "56u", "60l", "64u", "149l", "153u", "157l", "161u"]
        }
    },
    "MX": {
        name: _("Mexico"),
        channel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u"]
        }
    },
    "MA": {
        name: _("Morocco"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48],
            "40": ["0", "36l", "40u", "44l", "48u"]
        }
    }, */
    "NL": {
        name: _("Netherlands"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128]
        }
    },
    /* "NZ": {
        name: _("New Zealand"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "149l", "153u", "157l", "161u"]
        }
    },
    "PK": {
        name: _("Pakistan"),
        channel: [],
        channel_5g: {
            "20": [0, 149, 153, 157, 161, 165],
            "40": ["0", "149l", "153u", " 157l", "161u"],
            "80": [0, 149, 153, 157, 161]
        }
    },
    "PE": {
        name: _("Peru"),
        channel: [],
        channel_5g: {
            "20": [0, 149, 153, 157, 161, 165],
            "40": ["0", "153u", "161u", "149l", "157l"]
        }
    },
    "PH": {
        name: _("Philippines"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "120u", "128u", "132l", "136u", "140l", "149l", "153u", "157l", "161u"]
        }
    },
    "PL": {
        name: _("Poland"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    },
    "PT": {
        name: _("Portugal"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    },
    "RO": {
        name: _("Romania"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u"]
        }
    }, */
    "RU": {
        name: _("Russia"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "132l", "136u", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161]
        }
    },
    "SA": {
        name: _("SaudiArabia"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u", "140l", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161]
        }
    },
    /* "SI": {
        name: _("Slovenia"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    },
    "SK": {
        name: _("Slovak Republic"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    }, */
    "ZA": {
        name: _("South Afica"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "120u", "124l", "128u", "132l", "136u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128]
        }
    },
    "ES": {
        name: _("Spain"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128]
        }
    },
    /* "SE": {
        name: _("Sweden"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    },
    "CH": {
        name: _("Switzerland"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u"]
        }
    }, */
    "TW": {
        name: _("Taiwan"),
        channel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        channel_5g: {
            "20": [0, 56, 60, 64, 149, 153, 157, 161, 165],
            "40": ["0", "60l", "64u", "149l", "153u", "157l", "161u"],
            "80": [0, 149, 153, 157, 161]
        }
    },
    "TH": {
        name: _("Thailand"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112,
                116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161, 165
            ],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "120u", "128u", "132l", "136u", "140l", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112,
                116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161
            ]
        }
    },
    /* "TR": {
        name: _("Turkey"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u"]
        }
    }, */
    "AE": {
        name: _("United ArabEmirates"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112,
                116, 120, 124, 128, 132, 136, 140, 144, 149, 153, 157, 161, 165
            ],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "116l", "120u", "124l", "128u", "132l", "136u", "140l", "144u", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112,
                132, 136, 140, 144, 149, 153, 157, 161
            ]


        }
    },
    "US": {
        name: _("United States"),
        channel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161, 165],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u", "100l", "104u", "108l", "112u", "120u", "128u", "132l", "136u", "140l", "149l", "153u", "157l", "161u"],
            "80": [0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161]
        }
    }
    /* "VN": {
        name: _("Vietnam"),
        channel: [],
        channel_5g: {
            "20": [0, 36, 40, 44, 48, 52, 56, 60, 64],
            "40": ["0", "36l", "40u", "44l", "48u", "52l", "56u", "60l", "64u"]
        }
    } */
}

function init_country(id) {
    var str = '';

    for (var g in countryCode) {
        str += '<option value="' + g + '">' + countryCode[g].name + '</option>'
    }
    $("#" + id).html(str);
    str = null;
}
/*

radio:频率 2.4G = 0,5G =1
code：国家代码
band:带宽
id:信道插入节点ID
mode:网络模式

*/
function init_channel(radio, code, band, id, mode) {
    var str = '',
        i = 0,
        len = 0;
    var prev_value = $("#" + id).val();
    var DFSAuth1 = DFSAuth[0] == "1" ? true : false,
        DFSAuth2 = DFSAuth[1] == "1" ? true : false;
    if (radio == 0) {
        //if(netmode_24g[mode] == 'bgn' && bandarr_24g[band] != '20')
        len = parseInt(countryCode[code].channel.length, 10) || 14;
        for (i = 0; i < len; i++) {
            if (i == 0) {
                str += '<option value="0">Auto</option>';
            } else {
                str += '<option value="' + i + '">' + i + '</option>';
            }
        }
    } else if (radio == 1) {
        var arr = countryCode[code]["channel_5g"][band];
        len = arr.length;
        if (len == 1 && arr[0] == 'null')
            str += '<option value="0">Auto</option>';
        else {
            for (i = 0; i < len; i++) {
                if (arr[i] == 0)
                    str += '<option value="0">Auto</option>';
                else {
                    if (!DFSAuth1) { //未验证DFS1
                        if (parseInt(arr[i], 10) >= 52 && parseInt(arr[i], 10) <= 64) {
                            continue;
                        }
                    }
                    if (!DFSAuth2) { //未验证DFS2
                        if (parseInt(arr[i], 10) >= 100 && parseInt(arr[i], 10) <= 144) {
                            continue;
                        }
                    }

                    str += '<option value="' + parseInt(arr[i], 10) + '">' + parseInt(arr[i], 10) + '</option>';

                }
            }
        }
    }


    $("#" + id).html(str);
    $("#" + id).val(prev_value);
    var value = $("#" + id).val();
    if (typeof value == 'undefined')
        document.getElementByid(id).selectedIndex = 0;
    str = null;
}
/****
input : radio ：频率 ，2.4G=0,5G=1
        channel：当前信道
        maxch：2.4G为最大信道，5G为国家代码
        id:插入的节点ID
        
****/
function int_extend_channel(radio, channel, code, id) {
    var _ch = parseInt(channel, 10);
    var _maxch;
    var str = '';
    if (_ch == 0) {
        str += '<option value="none">Auto</option>'; //信道为0
        $("#" + id).html(str);
        //$("#"+id).attr("disabled",true);
        str = null;
    } else {
        if (radio == 0) {
            _maxch = (countryCode[code].channel.length || 14) - 1;
            if (_ch <= 4) {
                str += '<option value="lower">' + (_ch + 4) + '</option>';
                $("#" + id).html(str);
                //$("#"+id).attr("disabled",true);
                str = null;
            } else if (_ch > 4 && _ch <= (_maxch - 4)) {
                str += '<option value="upper">' + (_ch - 4) + '</option>' +
                    '<option value="lower">' + (_ch + 4) + '</option>';
                //$("#"+id).attr("disabled",false);
                $("#" + id).html(str);
                str = null;
            } else {
                str += '<option value="upper">' + (_ch - 4) + '</option>';
                $("#" + id).html(str);
                //$("#"+id).attr("disabled",true);
                str = null;
            }
        } else if (radio == 1) {
            var i = 0,
                loc = 0;
            var len = 0;
            var obj = countryCode[code]["channel_5g"];
            var arr = obj["40"];
            var extType = "";
            len = arr.length;
            for (i = 0; i < len; i++) {
                if (_ch == parseInt(arr[i], 10)) {
                    extType = arr[i].slice(-1);

                    if (extType == "u") { //upper
                        str += "<option value='upper'>" + (parseInt(_ch, 10) - 4) + "</option>";
                    } else if (extType == "l") { // lower
                        str += "<option value='lower'>" + (parseInt(_ch, 10) + 4) + "</option>";
                    }
                }
            }

            $("#" + id).html(str);
            str = null;
        }
    }
}
/*
    显示或者影藏
*/
function changeExtendChannelStatus(radio, netmode, bandwith, id) {
    if (radio == 0) {
        if (netmode == 'bgn' && (bandwith == '40' || bandwith == 'auto')) {
            $("#" + id).removeClass("none");
            return 0;
        } else {
            $("#" + id).addClass("none");
            return 1;
        }
    } else if (radio == 1) {
        if ((netmode == 'an' || netmode == 'ac') && (bandwith == '40')) {
            $("#" + id).removeClass("none");
            return 0;
        } else {
            $("#" + id).addClass("none");
            return 1;
        }
    }
}

function wlChannelScan(country, type, band) {
    var scanTitle = ""; //表头
    var scanStr = "", //表格所有数据
        str1 = "<tr><td>" + _("Number of Signals") + "</td>",
        str2 = "<tr><td>" + _("Channel Utilization(%)") + "</td>",
        str = "<tr class='a3'><td style='width:60px;'>" + _("Channel") + "</td>", //表头第一格
        subStr = "",
        sub24 = "",
        sub5 = "";
    var DFSAuth1 = DFSAuth[0] == "1" ? true : false,
        DFSAuth2 = DFSAuth[1] == "1" ? true : false;
    if ($("#wlChannelScan").val() == _("Enable Scan")) {
        if ($(".spendTime").val() == "") {
            alert(_("Please specify the Duration."));
            return false;
        } else if (~~$(".spendTime").val() < 1000 || ~~$(".spendTime").val() > 3000) {
            alert(_("Please enter the correct duration."));
            return false;
        } else {
            if($(".spendTime").val() <= 1600){
                $(".conMsg").find("label").text(_("The scanning will take about 30 seconds. Please wait..."));
            }else if($(".spendTime").val() <= 2200){
                $(".conMsg").find("label").text(_("The scanning will take about 40 seconds or so. Please wait..."));
            }else{
                $(".conMsg").find("label").text(_("The scanning will take about 50 seconds or so. Please wait..."));
            }
            $("#wlChannelScan").val(_("Disable Scan"));
            $("#wlChannelScan").attr("disabled", "true");
            for (x in countryCode) {
                if (x == country) {
                    //return false;
                    if (type == "2") {
                        $(".conMsg").show();
                        if (countryCode[country].channel.length == 0) {
                            //默认2.4g信道为1到13
                            for (var i = 0; i < 13; i++) {
                                str += "<td width='30px'>" + (i + 1) + "</td>";
                            }
                            sub24 = "1,2,3,4,5,6,7,8,9,10,11,12,13";
                        } else {
                            var len1 = countryCode[country].channel.length;
                            for (var i = 1; i < len1; i++) {
                                str += "<td width='30px'>" + countryCode[country].channel[i] + "</td>";
                            }
                            sub24 = countryCode[country].channel;
                        }
                        scanTitle = str;
                        subStr = "wrlRadio=2.4G&channel2.4=" + sub24 + "&time=" + $(".spendTime").val();
                        $.post("./goform/setChannelScan", subStr, function(data) {
                            $(".conMsg").hide();
                            $("#wlChannelScan").removeAttr("disabled");
							$("#wlChannelScan").val(_("Enable Scan"));
                            var data2 = $.parseJSON(data).channel2;
                            var str = data2.split(";"),
                                noiseLevel = str[0].split(","),
                                noiseLevelLen = noiseLevel.length,
                                busyStr = str[1].split(","),
                                busyStrLen = busyStr.length;
                            for (var i = 0; i < noiseLevelLen; i++) {
                                str1 += '<td>' + noiseLevel[i] + '</td>';
                            }
                            str1 += "</tr>";
                            for (var i = 0; i < busyStrLen; i++) {
                                if (busyStr[i] <= 50) {
                                    str2 += '<td style="background-color:#50A201;">' + busyStr[i] + '</td>';
                                } else if (busyStr[i] > 50 && busyStr[i] <= 80) {
                                    str2 += '<td style="background-color:#EAEA00;">' + busyStr[i] + '</td>';
                                } else {
                                    str2 += '<td style="background-color:#AF0000;">' + busyStr[i] + '</td>';
                                }
                            }
                            str2 += '</tr>';

                            scanStr = scanTitle + str1 + str2;
                            $("#wlChannelScanTab").html(scanStr).show();
                        });
                    } else {
                        $(".conMsg").show();
                        var len2 = countryCode[country].channel_5g[band].length;
                        var showLen = len2;
                        var subChannel = "";
                        for (var i = 1; i < showLen; i++) {
                            var channelVal = countryCode[country].channel_5g[band][i];
                            //信道截取
                            if(!DFSAuth1){
                                if(parseInt(channelVal,10) >= 52 && parseInt(channelVal,10) <= 64){
                                    len2--;
                                    continue;
                                }
                            }
                            if(!DFSAuth2){
                                if(parseInt(channelVal,10) >= 100 && parseInt(channelVal,10) <= 144){
                                    len2--;
                                    continue;
                                }
                            }

                            //0信道不显示
                            str += "<td width='30px'>" + countryCode[country].channel_5g[band][i] + "</td>";
                            subChannel += channelVal + ",";
                        }
                        scanTitle = str;
                        sub5 = subChannel.slice(0,subChannel.length-1) + "&time=" + $(".spendTime").val();
                        subStr = "wrlRadio=5G&channel5=" + sub5;
                        $.post("./goform/setChannelScan", subStr, function(data) {
                            $(".conMsg").hide();
                            $("#wlChannelScan").removeAttr("disabled");
							$("#wlChannelScan").val(_("Enable Scan"));
                            var data5 = $.parseJSON(data).channel5;
                            var str = data5.split(";"),
                                noiseLevel = str[0].split(","),
                                noiseLevelLen = noiseLevel.length,
                                busyStr = str[1].split(","),
                                busyStrLen = busyStr.length;
                            for (var i = 0; i < noiseLevelLen; i++) {
                                str1 += '<td>' + noiseLevel[i] + '</td>';
                            }
                            str1 += "</tr>";
                            for (var i = 0; i < busyStrLen; i++) {
                                if (busyStr[i] < 50) {
                                    str2 += '<td style="background-color:#50A201;">' + busyStr[i] + '</td>';
                                } else if (busyStr[i] > 50 && busyStr[i] < 80) {
                                    str2 += '<td style="background-color:#EAEA00;">' + busyStr[i] + '</td>';
                                } else {
                                    str2 += '<td style="background-color:#AF0000;">' + busyStr[i] + '</td>';
                                }
                            }
                            str2 += '</tr>';

                            scanStr = scanTitle + str1 + str2;
                            $("#wlChannelScanTab").html(scanStr).show();
                        });
                    }
                }
            }
        }
    } else {
        $("#wlChannelScan").val(_("Enable Scan"));
        $("#wlChannelScan").removeAttr("disabled");
        $("#wlChannelScanTab").hide();
        $(".conMsg").hide();
    }
}
