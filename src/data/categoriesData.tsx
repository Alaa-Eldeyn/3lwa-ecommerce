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
          { id: 111, title: t('sofas'), path: '/products?c=sofas' },
          { id: 112, title: t('tv_units'), path: '/products?c=tv-units' },
          { id: 113, title: t('coffee_tables'), path: '/products?c=coffee-tables' },
          { id: 114, title: t('side_tables'), path: '/products?c=side-tables' },
          { id: 115, title: t('armchairs'), path: '/products?c=armchairs' },
          { id: 116, title: t('sectionals'), path: '/products?c=sectionals' },
          { id: 117, title: t('recliners'), path: '/products?c=recliners' },
        ]
      },
      {
        id: 12,
        title: t('bedroom'),
        items: [
          { id: 121, title: t('beds'), path: '/products?c=beds' },
          { id: 122, title: t('wardrobes'), path: '/products?c=wardrobes' },
          { id: 123, title: t('dressers'), path: '/products?c=dressers' },
          { id: 124, title: t('nightstands'), path: '/products?c=nightstands' },
          { id: 125, title: t('vanities'), path: '/products?c=vanities' },
          { id: 126, title: t('bedroom_sets'), path: '/products?c=bedroom-sets' },
        ]
      },
      {
        id: 13,
        title: t('dining_room'),
        items: [
          { id: 131, title: t('dining_tables'), path: '/products?c=dining-tables' },
          { id: 132, title: t('dining_chairs'), path: '/products?c=dining-chairs' },
          { id: 133, title: t('buffets'), path: '/products?c=buffets' },
          { id: 134, title: t('bar_stools'), path: '/products?c=bar-stools' },
          { id: 135, title: t('dining_sets'), path: '/products?c=dining-sets' },
        ]
      },
      {
        id: 14,
        title: t('office'),
        items: [
          { id: 141, title: t('office_desks'), path: '/products?c=office-desks' },
          { id: 142, title: t('office_chairs'), path: '/products?c=office-chairs' },
          { id: 143, title: t('bookcases'), path: '/products?c=bookcases' },
          { id: 144, title: t('filing_cabinets'), path: '/products?c=filing-cabinets' },
          { id: 145, title: t('desk_accessories'), path: '/products?c=desk-accessories' },
        ]
      },
      {
        id: 15,
        title: t('kids_room'),
        items: [
          { id: 151, title: t('kids_beds'), path: '/products?c=kids-beds' },
          { id: 152, title: t('kids_storage'), path: '/products?c=kids-storage' },
          { id: 153, title: t('study_desks'), path: '/products?c=study-desks' },
          { id: 154, title: t('toy_boxes'), path: '/products?c=toy-boxes' },
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
          { id: 211, title: t('chandeliers'), path: '/products?c=chandeliers' },
          { id: 212, title: t('floor_lamps'), path: '/products?c=floor-lamps' },
          { id: 213, title: t('table_lamps'), path: '/products?c=table-lamps' },
          { id: 214, title: t('wall_lights'), path: '/products?c=wall-lights' },
          { id: 215, title: t('pendant_lights'), path: '/products?c=pendant-lights' },
          { id: 216, title: t('desk_lamps'), path: '/products?c=desk-lamps' },
        ]
      },
      {
        id: 22,
        title: t('wall_decor'),
        items: [
          { id: 221, title: t('wall_art'), path: '/products?c=wall-art' },
          { id: 222, title: t('mirrors'), path: '/products?c=mirrors' },
          { id: 223, title: t('wall_shelves'), path: '/products?c=wall-shelves' },
          { id: 224, title: t('clocks'), path: '/products?c=clocks' },
          { id: 225, title: t('photo_frames'), path: '/products?c=photo-frames' },
        ]
      },
      {
        id: 23,
        title: t('rugs_carpets'),
        items: [
          { id: 231, title: t('area_rugs'), path: '/products?c=area-rugs' },
          { id: 232, title: t('runners'), path: '/products?c=runners' },
          { id: 233, title: t('outdoor_rugs'), path: '/products?c=outdoor-rugs' },
          { id: 234, title: t('round_rugs'), path: '/products?c=round-rugs' },
        ]
      },
      {
        id: 24,
        title: t('decorative_items'),
        items: [
          { id: 241, title: t('vases'), path: '/products?c=vases' },
          { id: 242, title: t('candles'), path: '/products?c=candles' },
          { id: 243, title: t('sculptures'), path: '/products?c=sculptures' },
          { id: 244, title: t('artificial_plants'), path: '/products?c=artificial-plants' },
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
          { id: 311, title: t('pots_pans'), path: '/products?c=pots-pans' },
          { id: 312, title: t('baking'), path: '/products?c=baking' },
          { id: 313, title: t('kitchen_tools'), path: '/products?c=kitchen-tools' },
          { id: 314, title: t('knives'), path: '/products?c=knives' },
          { id: 315, title: t('cutting_boards'), path: '/products?c=cutting-boards' },
        ]
      },
      {
        id: 32,
        title: t('tableware'),
        items: [
          { id: 321, title: t('dinner_sets'), path: '/products?c=dinner-sets' },
          { id: 322, title: t('glassware'), path: '/products?c=glassware' },
          { id: 323, title: t('cutlery'), path: '/products?c=cutlery' },
          { id: 324, title: t('serving_dishes'), path: '/products?c=serving-dishes' },
          { id: 325, title: t('mugs_cups'), path: '/products?c=mugs-cups' },
        ]
      },
      {
        id: 33,
        title: t('storage'),
        items: [
          { id: 331, title: t('containers'), path: '/products?c=containers' },
          { id: 332, title: t('organizers'), path: '/products?c=organizers' },
          { id: 333, title: t('jars_bottles'), path: '/products?c=jars-bottles' },
        ]
      },
      {
        id: 34,
        title: t('appliances'),
        items: [
          { id: 341, title: t('blenders'), path: '/products?c=blenders' },
          { id: 342, title: t('coffee_makers'), path: '/products?c=coffee-makers' },
          { id: 343, title: t('toasters'), path: '/products?c=toasters' },
          { id: 344, title: t('food_processors'), path: '/products?c=food-processors' },
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
          { id: 411, title: t('bed_sheets'), path: '/products?c=bed-sheets' },
          { id: 412, title: t('comforters'), path: '/products?c=comforters' },
          { id: 413, title: t('pillows'), path: '/products?c=pillows' },
          { id: 414, title: t('blankets'), path: '/products?c=blankets' },
          { id: 415, title: t('mattress_protectors'), path: '/products?c=mattress-protectors' },
          { id: 416, title: t('duvet_covers'), path: '/products?c=duvet-covers' },
        ]
      },
      {
        id: 42,
        title: t('bath'),
        items: [
          { id: 421, title: t('towels'), path: '/products?c=towels' },
          { id: 422, title: t('bath_mats'), path: '/products?c=bath-mats' },
          { id: 423, title: t('shower_curtains'), path: '/products?c=shower-curtains' },
          { id: 424, title: t('bathrobes'), path: '/products?c=bathrobes' },
        ]
      },
      {
        id: 43,
        title: t('curtains'),
        items: [
          { id: 431, title: t('blackout_curtains'), path: '/products?c=blackout-curtains' },
          { id: 432, title: t('sheer_curtains'), path: '/products?c=sheer-curtains' },
          { id: 433, title: t('thermal_curtains'), path: '/products?c=thermal-curtains' },
          { id: 434, title: t('curtain_rods'), path: '/products?c=curtain-rods' },
        ]
      },
      {
        id: 44,
        title: t('cushions_throws'),
        items: [
          { id: 441, title: t('throw_pillows'), path: '/products?c=throw-pillows' },
          { id: 442, title: t('throw_blankets'), path: '/products?c=throw-blankets' },
          { id: 443, title: t('cushion_covers'), path: '/products?c=cushion-covers' },
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
          { id: 511, title: t('patio_sets'), path: '/products?c=patio-sets' },
          { id: 512, title: t('outdoor_chairs'), path: '/products?c=outdoor-chairs' },
          { id: 513, title: t('garden_benches'), path: '/products?c=garden-benches' },
          { id: 514, title: t('outdoor_tables'), path: '/products?c=outdoor-tables' },
          { id: 515, title: t('hammocks'), path: '/products?c=hammocks' },
        ]
      },
      {
        id: 52,
        title: t('garden_decor'),
        items: [
          { id: 521, title: t('planters'), path: '/products?c=planters' },
          { id: 522, title: t('garden_lights'), path: '/products?c=garden-lights' },
          { id: 523, title: t('outdoor_cushions'), path: '/products?c=outdoor-cushions' },
          { id: 524, title: t('fountains'), path: '/products?c=fountains' },
          { id: 525, title: t('garden_statues'), path: '/products?c=garden-statues' },
        ]
      },
      {
        id: 53,
        title: t('outdoor_living'),
        items: [
          { id: 531, title: t('bbq_grills'), path: '/products?c=bbq-grills' },
          { id: 532, title: t('fire_pits'), path: '/products?c=fire-pits' },
          { id: 533, title: t('umbrellas'), path: '/products?c=umbrellas' },
          { id: 534, title: t('outdoor_heaters'), path: '/products?c=outdoor-heaters' },
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
          { id: 611, title: t('vanity_units'), path: '/products?c=vanity-units' },
          { id: 612, title: t('bathroom_cabinets'), path: '/products?c=bathroom-cabinets' },
          { id: 613, title: t('mirrors'), path: '/products?c=bathroom-mirrors' },
        ]
      },
      {
        id: 62,
        title: t('bathroom_accessories'),
        items: [
          { id: 621, title: t('soap_dispensers'), path: '/products?c=soap-dispensers' },
          { id: 622, title: t('toothbrush_holders'), path: '/products?c=toothbrush-holders' },
          { id: 623, title: t('toilet_brush'), path: '/products?c=toilet-brush' },
          { id: 624, title: t('waste_bins'), path: '/products?c=waste-bins' },
        ]
      },
      {
        id: 63,
        title: t('bath_fixtures'),
        items: [
          { id: 631, title: t('faucets'), path: '/products?c=faucets' },
          { id: 632, title: t('showerheads'), path: '/products?c=showerheads' },
          { id: 633, title: t('towel_racks'), path: '/products?c=towel-racks' },
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
          { id: 711, title: t('hangers'), path: '/products?c=hangers' },
          { id: 712, title: t('shoe_racks'), path: '/products?c=shoe-racks' },
          { id: 713, title: t('storage_boxes'), path: '/products?c=storage-boxes' },
          { id: 714, title: t('garment_bags'), path: '/products?c=garment-bags' },
        ]
      },
      {
        id: 72,
        title: t('shelving_units'),
        items: [
          { id: 721, title: t('wall_shelves'), path: '/products?c=wall-shelves-storage' },
          { id: 722, title: t('cube_storage'), path: '/products?c=cube-storage' },
          { id: 723, title: t('ladder_shelves'), path: '/products?c=ladder-shelves' },
        ]
      },
      {
        id: 73,
        title: t('baskets_bins'),
        items: [
          { id: 731, title: t('wicker_baskets'), path: '/products?c=wicker-baskets' },
          { id: 732, title: t('fabric_bins'), path: '/products?c=fabric-bins' },
          { id: 733, title: t('wire_baskets'), path: '/products?c=wire-baskets' },
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
          { id: 311, title: t('pots_pans'), path: '/products?c=pots-pans' },
          { id: 312, title: t('baking'), path: '/products?c=baking' },
          { id: 313, title: t('kitchen_tools'), path: '/products?c=kitchen-tools' },
          { id: 314, title: t('knives'), path: '/products?c=knives' },
          { id: 315, title: t('cutting_boards'), path: '/products?c=cutting-boards' },
        ]
      },
      {
        id: 32,
        title: t('tableware'),
        items: [
          { id: 321, title: t('dinner_sets'), path: '/products?c=dinner-sets' },
          { id: 322, title: t('glassware'), path: '/products?c=glassware' },
          { id: 323, title: t('cutlery'), path: '/products?c=cutlery' },
          { id: 324, title: t('serving_dishes'), path: '/products?c=serving-dishes' },
          { id: 325, title: t('mugs_cups'), path: '/products?c=mugs-cups' },
        ]
      },
      {
        id: 33,
        title: t('storage'),
        items: [
          { id: 331, title: t('containers'), path: '/products?c=containers' },
          { id: 332, title: t('organizers'), path: '/products?c=organizers' },
          { id: 333, title: t('jars_bottles'), path: '/products?c=jars-bottles' },
        ]
      },
      {
        id: 34,
        title: t('appliances'),
        items: [
          { id: 341, title: t('blenders'), path: '/products?c=blenders' },
          { id: 342, title: t('coffee_makers'), path: '/products?c=coffee-makers' },
          { id: 343, title: t('toasters'), path: '/products?c=toasters' },
          { id: 344, title: t('food_processors'), path: '/products?c=food-processors' },
        ]
      }
    ]
  },
];
