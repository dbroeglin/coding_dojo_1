function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

// end of goblin territory

function decrement_sell_in(item) {
  item.sell_in = item.sell_in - 1;
}

function update_aged_brie(item) {
  item.quality = Math.max(Math.min(item.quality + 1, 50), 0);
  decrement_sell_in(item);
}

function update_backstage_passes(item) {
  if (item.sell_in <= 0) {
    item.quality = 0;
  } else {
    var increase = 1;

    if (item.sell_in <= 5) {
      increase = 3;
    } else if (item.sell_in <= 10) {
      increase = 2;
    }
    item.quality = Math.max(Math.min(item.quality + increase, 50), 0);
  }
  decrement_sell_in(item);
}

function update_legendary_item(item) {
  item.sell_in = 0;
  item.quality = Math.min(item.quality, 50);
}

function update_conjured_mana_cake(item) {
  var quality_reduction = item.sell_in > 0 ? 2 : 4;

  item.quality = Math.min(Math.max(item.quality - quality_reduction, 0), 50);
  decrement_sell_in(item);
}

function update_standard_item(item) {
  var quality_reduction = item.sell_in > 0 ? 1 : 2;

  item.quality = Math.min(Math.max(item.quality - quality_reduction, 0), 50);
  decrement_sell_in(item);
}

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    select_update_fn(item.name)(item);
  }
}

function select_update_fn(name) {
  var update_fn;
  switch(name) {
    case 'Conjured Mana Cake':
      return update_conjured_mana_cake;
    case 'Aged Brie':
      return update_aged_brie;
    case 'Sulfuras, Hand of Ragnaros':
      return update_legendary_item;
    case 'Backstage passes to a TAFKAL80ETC concert':
      return update_backstage_passes;
    default:
      return update_standard_item;
  };

  return update_fn;
}
