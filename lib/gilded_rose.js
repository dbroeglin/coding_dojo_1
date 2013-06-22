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

function update_item_quality(item) {
  if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
    if (item.quality > 0) {
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.quality = item.quality - 1
      }
    }
  } else {
    if (item.quality < 50) {
      item.quality = item.quality + 1
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sell_in < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
          if (item.sell_in < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
        }
    }
  }

  update_sell_in(item);

  if (item.sell_in < 0) {
    if (item.name != 'Aged Brie') {
      if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality = item.quality - 1
          }
        }
      } else {
        item.quality = item.quality - item.quality
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1
      }
    }
  }
}

function update_sell_in(item) {
  if (item.name != 'Sulfuras, Hand of Ragnaros') {
    item.sell_in = item.sell_in - 1;
  }
}

function decrement_sell_in(item) {
  item.sell_in = item.sell_in - 1;
}

function update_quality() {
  for (var i = 0; i < 5; i++) {
    var item = items[i];
    switch(item.name) {
      case 'Conjured Mana Cake':
        update_conjured_mana_cake(item);
        break;
      case 'Aged Brie':
        update_aged_brie(item);
        break;
      case '+5 Dexterity Vest':
        update_standard_item(item);
        break;
      case 'Sulfuras, Hand of Ragnaros':
        update_legendary_item(item);
        break;
      default:
        update_item_quality(item);
    }
  }

  update_conjured_mana_cake(items[5]);
}

function update_aged_brie(item) {
  item.quality = Math.max(Math.min(item.quality + 1, 50), 0);
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
