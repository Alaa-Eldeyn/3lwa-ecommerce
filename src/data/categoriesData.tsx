export const getCategoriesData = (t: (key: string) => string) => [
  {
    id: 1,
    title: t('furniture'),
    slug: 'furniture',
    subcategories: [
      {
        id: 11,
        title: t('living_room'),
        items: [
          { id: 111, title: t('sofas'), path: '/products?cat=sofas' },
          { id: 112, title: t('tv_units'), path: '/products?cat=tv-units' },
          { id: 113, title: t('coffee_tables'), path: '/products?cat=coffee-tables' },
          { id: 114, title: t('side_tables'), path: '/products?cat=side-tables' },
          { id: 115, title: t('armchairs'), path: '/products?cat=armchairs' },
          { id: 116, title: t('sectionals'), path: '/products?cat=sectionals' },
          { id: 117, title: t('recliners'), path: '/products?cat=recliners' },
        ]
      },
      {
        id: 12,
        title: t('bedroom'),
        items: [
          { id: 121, title: t('beds'), path: '/products?cat=beds' },
          { id: 122, title: t('wardrobes'), path: '/products?cat=wardrobes' },
          { id: 123, title: t('dressers'), path: '/products?cat=dressers' },
          { id: 124, title: t('nightstands'), path: '/products?cat=nightstands' },
          { id: 125, title: t('vanities'), path: '/products?cat=vanities' },
          { id: 126, title: t('bedroom_sets'), path: '/products?cat=bedroom-sets' },
        ]
      },
      {
        id: 13,
        title: t('dining_room'),
        items: [
          { id: 131, title: t('dining_tables'), path: '/products?cat=dining-tables' },
          { id: 132, title: t('dining_chairs'), path: '/products?cat=dining-chairs' },
          { id: 133, title: t('buffets'), path: '/products?cat=buffets' },
          { id: 134, title: t('bar_stools'), path: '/products?cat=bar-stools' },
          { id: 135, title: t('dining_sets'), path: '/products?cat=dining-sets' },
        ]
      },
      {
        id: 14,
        title: t('office'),
        items: [
          { id: 141, title: t('office_desks'), path: '/products?cat=office-desks' },
          { id: 142, title: t('office_chairs'), path: '/products?cat=office-chairs' },
          { id: 143, title: t('bookcases'), path: '/products?cat=bookcases' },
          { id: 144, title: t('filing_cabinets'), path: '/products?cat=filing-cabinets' },
          { id: 145, title: t('desk_accessories'), path: '/products?cat=desk-accessories' },
        ]
      },
      {
        id: 15,
        title: t('kids_room'),
        items: [
          { id: 151, title: t('kids_beds'), path: '/products?cat=kids-beds' },
          { id: 152, title: t('kids_storage'), path: '/products?cat=kids-storage' },
          { id: 153, title: t('study_desks'), path: '/products?cat=study-desks' },
          { id: 154, title: t('toy_boxes'), path: '/products?cat=toy-boxes' },
        ]
      }
    ]
  },
  {
    id: 2,
    title: t('home_decor'),
    slug: 'home-decor',
    subcategories: [
      {
        id: 21,
        title: t('lighting'),
        items: [
          { id: 211, title: t('chandeliers'), path: '/products?cat=chandeliers' },
          { id: 212, title: t('floor_lamps'), path: '/products?cat=floor-lamps' },
          { id: 213, title: t('table_lamps'), path: '/products?cat=table-lamps' },
          { id: 214, title: t('wall_lights'), path: '/products?cat=wall-lights' },
          { id: 215, title: t('pendant_lights'), path: '/products?cat=pendant-lights' },
          { id: 216, title: t('desk_lamps'), path: '/products?cat=desk-lamps' },
        ]
      },
      {
        id: 22,
        title: t('wall_decor'),
        items: [
          { id: 221, title: t('wall_art'), path: '/products?cat=wall-art' },
          { id: 222, title: t('mirrors'), path: '/products?cat=mirrors' },
          { id: 223, title: t('wall_shelves'), path: '/products?cat=wall-shelves' },
          { id: 224, title: t('clocks'), path: '/products?cat=clocks' },
          { id: 225, title: t('photo_frames'), path: '/products?cat=photo-frames' },
        ]
      },
      {
        id: 23,
        title: t('rugs_carpets'),
        items: [
          { id: 231, title: t('area_rugs'), path: '/products?cat=area-rugs' },
          { id: 232, title: t('runners'), path: '/products?cat=runners' },
          { id: 233, title: t('outdoor_rugs'), path: '/products?cat=outdoor-rugs' },
          { id: 234, title: t('round_rugs'), path: '/products?cat=round-rugs' },
        ]
      },
      {
        id: 24,
        title: t('decorative_items'),
        items: [
          { id: 241, title: t('vases'), path: '/products?cat=vases' },
          { id: 242, title: t('candles'), path: '/products?cat=candles' },
          { id: 243, title: t('sculptures'), path: '/products?cat=sculptures' },
          { id: 244, title: t('artificial_plants'), path: '/products?cat=artificial-plants' },
        ]
      }
    ]
  },
  {
    id: 3,
    title: t('kitchen_dining'),
    slug: 'kitchen-dining',
    subcategories: [
      {
        id: 31,
        title: t('cookware'),
        items: [
          { id: 311, title: t('pots_pans'), path: '/products?cat=pots-pans' },
          { id: 312, title: t('baking'), path: '/products?cat=baking' },
          { id: 313, title: t('kitchen_tools'), path: '/products?cat=kitchen-tools' },
          { id: 314, title: t('knives'), path: '/products?cat=knives' },
          { id: 315, title: t('cutting_boards'), path: '/products?cat=cutting-boards' },
        ]
      },
      {
        id: 32,
        title: t('tableware'),
        items: [
          { id: 321, title: t('dinner_sets'), path: '/products?cat=dinner-sets' },
          { id: 322, title: t('glassware'), path: '/products?cat=glassware' },
          { id: 323, title: t('cutlery'), path: '/products?cat=cutlery' },
          { id: 324, title: t('serving_dishes'), path: '/products?cat=serving-dishes' },
          { id: 325, title: t('mugs_cups'), path: '/products?cat=mugs-cups' },
        ]
      },
      {
        id: 33,
        title: t('storage'),
        items: [
          { id: 331, title: t('containers'), path: '/products?cat=containers' },
          { id: 332, title: t('organizers'), path: '/products?cat=organizers' },
          { id: 333, title: t('jars_bottles'), path: '/products?cat=jars-bottles' },
        ]
      },
      {
        id: 34,
        title: t('appliances'),
        items: [
          { id: 341, title: t('blenders'), path: '/products?cat=blenders' },
          { id: 342, title: t('coffee_makers'), path: '/products?cat=coffee-makers' },
          { id: 343, title: t('toasters'), path: '/products?cat=toasters' },
          { id: 344, title: t('food_processors'), path: '/products?cat=food-processors' },
        ]
      }
    ]
  },
  {
    id: 4,
    title: t('textiles'),
    slug: 'textiles',
    subcategories: [
      {
        id: 41,
        title: t('bedding'),
        items: [
          { id: 411, title: t('bed_sheets'), path: '/products?cat=bed-sheets' },
          { id: 412, title: t('comforters'), path: '/products?cat=comforters' },
          { id: 413, title: t('pillows'), path: '/products?cat=pillows' },
          { id: 414, title: t('blankets'), path: '/products?cat=blankets' },
          { id: 415, title: t('mattress_protectors'), path: '/products?cat=mattress-protectors' },
          { id: 416, title: t('duvet_covers'), path: '/products?cat=duvet-covers' },
        ]
      },
      {
        id: 42,
        title: t('bath'),
        items: [
          { id: 421, title: t('towels'), path: '/products?cat=towels' },
          { id: 422, title: t('bath_mats'), path: '/products?cat=bath-mats' },
          { id: 423, title: t('shower_curtains'), path: '/products?cat=shower-curtains' },
          { id: 424, title: t('bathrobes'), path: '/products?cat=bathrobes' },
        ]
      },
      {
        id: 43,
        title: t('curtains'),
        items: [
          { id: 431, title: t('blackout_curtains'), path: '/products?cat=blackout-curtains' },
          { id: 432, title: t('sheer_curtains'), path: '/products?cat=sheer-curtains' },
          { id: 433, title: t('thermal_curtains'), path: '/products?cat=thermal-curtains' },
          { id: 434, title: t('curtain_rods'), path: '/products?cat=curtain-rods' },
        ]
      },
      {
        id: 44,
        title: t('cushions_throws'),
        items: [
          { id: 441, title: t('throw_pillows'), path: '/products?cat=throw-pillows' },
          { id: 442, title: t('throw_blankets'), path: '/products?cat=throw-blankets' },
          { id: 443, title: t('cushion_covers'), path: '/products?cat=cushion-covers' },
        ]
      }
    ]
  },
  {
    id: 5,
    title: t('outdoor'),
    slug: 'outdoor',
    subcategories: [
      {
        id: 51,
        title: t('outdoor_furniture'),
        items: [
          { id: 511, title: t('patio_sets'), path: '/products?cat=patio-sets' },
          { id: 512, title: t('outdoor_chairs'), path: '/products?cat=outdoor-chairs' },
          { id: 513, title: t('garden_benches'), path: '/products?cat=garden-benches' },
          { id: 514, title: t('outdoor_tables'), path: '/products?cat=outdoor-tables' },
          { id: 515, title: t('hammocks'), path: '/products?cat=hammocks' },
        ]
      },
      {
        id: 52,
        title: t('garden_decor'),
        items: [
          { id: 521, title: t('planters'), path: '/products?cat=planters' },
          { id: 522, title: t('garden_lights'), path: '/products?cat=garden-lights' },
          { id: 523, title: t('outdoor_cushions'), path: '/products?cat=outdoor-cushions' },
          { id: 524, title: t('fountains'), path: '/products?cat=fountains' },
          { id: 525, title: t('garden_statues'), path: '/products?cat=garden-statues' },
        ]
      },
      {
        id: 53,
        title: t('outdoor_living'),
        items: [
          { id: 531, title: t('bbq_grills'), path: '/products?cat=bbq-grills' },
          { id: 532, title: t('fire_pits'), path: '/products?cat=fire-pits' },
          { id: 533, title: t('umbrellas'), path: '/products?cat=umbrellas' },
          { id: 534, title: t('outdoor_heaters'), path: '/products?cat=outdoor-heaters' },
        ]
      }
    ]
  },
  {
    id: 6,
    title: t('bathroom'),
    slug: 'bathroom',
    subcategories: [
      {
        id: 61,
        title: t('bathroom_furniture'),
        items: [
          { id: 611, title: t('vanity_units'), path: '/products?cat=vanity-units' },
          { id: 612, title: t('bathroom_cabinets'), path: '/products?cat=bathroom-cabinets' },
          { id: 613, title: t('mirrors'), path: '/products?cat=bathroom-mirrors' },
        ]
      },
      {
        id: 62,
        title: t('bathroom_accessories'),
        items: [
          { id: 621, title: t('soap_dispensers'), path: '/products?cat=soap-dispensers' },
          { id: 622, title: t('toothbrush_holders'), path: '/products?cat=toothbrush-holders' },
          { id: 623, title: t('toilet_brush'), path: '/products?cat=toilet-brush' },
          { id: 624, title: t('waste_bins'), path: '/products?cat=waste-bins' },
        ]
      },
      {
        id: 63,
        title: t('bath_fixtures'),
        items: [
          { id: 631, title: t('faucets'), path: '/products?cat=faucets' },
          { id: 632, title: t('showerheads'), path: '/products?cat=showerheads' },
          { id: 633, title: t('towel_racks'), path: '/products?cat=towel-racks' },
        ]
      }
    ]
  },
  {
    id: 7,
    title: t('storage_organization'),
    slug: 'storage-organization',
    subcategories: [
      {
        id: 71,
        title: t('closet_storage'),
        items: [
          { id: 711, title: t('hangers'), path: '/products?cat=hangers' },
          { id: 712, title: t('shoe_racks'), path: '/products?cat=shoe-racks' },
          { id: 713, title: t('storage_boxes'), path: '/products?cat=storage-boxes' },
          { id: 714, title: t('garment_bags'), path: '/products?cat=garment-bags' },
        ]
      },
      {
        id: 72,
        title: t('shelving_units'),
        items: [
          { id: 721, title: t('wall_shelves'), path: '/products?cat=wall-shelves-storage' },
          { id: 722, title: t('cube_storage'), path: '/products?cat=cube-storage' },
          { id: 723, title: t('ladder_shelves'), path: '/products?cat=ladder-shelves' },
        ]
      },
      {
        id: 73,
        title: t('baskets_bins'),
        items: [
          { id: 731, title: t('wicker_baskets'), path: '/products?cat=wicker-baskets' },
          { id: 732, title: t('fabric_bins'), path: '/products?cat=fabric-bins' },
          { id: 733, title: t('wire_baskets'), path: '/products?cat=wire-baskets' },
        ]
      }
    ]
  },
  {
    id: 8,
    title: t('kitchen_dining'),
    slug: 'kitchen-dining',
    subcategories: [
      {
        id: 31,
        title: t('cookware'),
        items: [
          { id: 311, title: t('pots_pans'), path: '/products?cat=pots-pans' },
          { id: 312, title: t('baking'), path: '/products?cat=baking' },
          { id: 313, title: t('kitchen_tools'), path: '/products?cat=kitchen-tools' },
          { id: 314, title: t('knives'), path: '/products?cat=knives' },
          { id: 315, title: t('cutting_boards'), path: '/products?cat=cutting-boards' },
        ]
      },
      {
        id: 32,
        title: t('tableware'),
        items: [
          { id: 321, title: t('dinner_sets'), path: '/products?cat=dinner-sets' },
          { id: 322, title: t('glassware'), path: '/products?cat=glassware' },
          { id: 323, title: t('cutlery'), path: '/products?cat=cutlery' },
          { id: 324, title: t('serving_dishes'), path: '/products?cat=serving-dishes' },
          { id: 325, title: t('mugs_cups'), path: '/products?cat=mugs-cups' },
        ]
      },
      {
        id: 33,
        title: t('storage'),
        items: [
          { id: 331, title: t('containers'), path: '/products?cat=containers' },
          { id: 332, title: t('organizers'), path: '/products?cat=organizers' },
          { id: 333, title: t('jars_bottles'), path: '/products?cat=jars-bottles' },
        ]
      },
      {
        id: 34,
        title: t('appliances'),
        items: [
          { id: 341, title: t('blenders'), path: '/products?cat=blenders' },
          { id: 342, title: t('coffee_makers'), path: '/products?cat=coffee-makers' },
          { id: 343, title: t('toasters'), path: '/products?cat=toasters' },
          { id: 344, title: t('food_processors'), path: '/products?cat=food-processors' },
        ]
      }
    ]
  },
];
