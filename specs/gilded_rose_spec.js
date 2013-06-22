describe("Gilded Rose", function() {

  function shouldNotDegradeBelowZero(fn) {
    describe("if quality is 0", function() {
      beforeEach(function() {
        this.item.quality = 0;
      });

      it("should not degrade anymore", function() {
        fn(this.item);
        expect(this.item).to.sell_in(0).and.have.quality(0);
      });

      it("should not degrade anymore after sell date", function() {
        this.item.sell_in = 0;
        fn(this.item);
        expect(this.item).to.sell_in(-1).and.have.quality(0);
      });
    });
  }

  function shouldNotAllowQualityHigherThanFifty(fn) {
    it("should truncate quality from 51 to 50", function() {
      this.item.quality = 51;
      fn(this.item);
      expect(this.item.quality).to.be.below(51);
    });

    it("should truncate quality from 60 to 50", function() {
      this.item.quality = 60;
      fn(this.item);
      expect(this.item.quality).to.be.below(51);
    });
  }


  describe("+5 Dexterity Vest (standard)", function() {
    beforeEach(function () {
      this.item = new Item('+5 Dexterity Vest', 1, 0);
    });

    shouldNotDegradeBelowZero(update_standard_item);
    shouldNotAllowQualityHigherThanFifty(update_standard_item);

    describe("quality at 50", function() {
      beforeEach(function () {
        this.item.quality = 50;
      });

      it("should degrage quality at normal rate", function() {
        update_standard_item(this.item);
        expect(this.item).to.sell_in(0).and.have.quality(49);
      });
    });    
  });

  describe("Aged Brie", function() {
    beforeEach(function() {
      this.item = new Item('Aged Brie', 1, 0);
    });

    shouldNotAllowQualityHigherThanFifty(update_aged_brie);

    it("should increase in quality before selling date", function() {
      update_aged_brie(this.item);
      expect(this.item).to.sell_in(0).and.have.quality(1);
    });

    it("should increase in quality after selling date", function() {
      this.sell_in = -1;
      update_aged_brie(this.item);
      expect(this.item).to.sell_in(0).and.have.quality(1);
    });

    it("should not increase in quality before selling date", function() {
      update_aged_brie(this.item);
      expect(this.item).to.sell_in(0).and.have.quality(1);
    });

    describe("if quality at 50", function() {
      beforeEach(function() {
        this.item.quality = 50;
      });

      it("should not increase higher than 50 before selling date", function() {
        update_aged_brie(this.item);
         expect(this.item.quality).to.be.below(51);
      });
      it("should not increase higher than 50 after selling date", function() {
        this.sell_in = -1;
        update_aged_brie(this.item);
         expect(this.item.quality).to.be.below(51);
      });
    });
  });

  describe("Mana cake", function() {
    beforeEach(function() {
      this.item = new Item('Conjured Mana Cake', 1, 0);
    });

    shouldNotDegradeBelowZero(update_conjured_mana_cake);		
    shouldNotAllowQualityHigherThanFifty(update_conjured_mana_cake);

    describe("if quality at 50", function() {
      beforeEach(function() {
        this.item.quality = 50;
      });

      it("should degrage quality at normal rate", function() {
        this.item.sell_in = 1;
        update_conjured_mana_cake(this.item);
        expect(this.item).to.sell_in(0).and.have.quality(48);
      });

      it("should degrage quality twice as fast as usual (2 x 2) after sell date", function() {
        this.item.sell_in = 0;
        update_conjured_mana_cake(this.item);
        expect(this.item).to.sell_in(-1).and.have.quality(46);
      })

      it("should degrage quality twice as fast as usual (2 x 2) 1 day after sell date", function() {
        this.item.sell_in = -1;
        update_conjured_mana_cake(this.item);
        expect(this.item).to.sell_in(-2).and.have.quality(46);
      })
    });
  });

  describe("Sulfuras (legendary)", function() {
    beforeEach(function() {
      this.item = new Item('Sulfuras, Hand of Ragnaros', 1, 30);
    });

    shouldNotAllowQualityHigherThanFifty(update_legendary_item);

    it("should not have a sell date (fixed to 0)", function() {
      update_legendary_item(this.item);
      expect(this.item).to.sell_in(0);
    });

    it("should not have a sell date (fixed to 0 even after)", function() {
      this.item.sell_in = -1;
      update_legendary_item(this.item);
      expect(this.item).to.sell_in(0);
    });

    it("should not degrade quality", function() {
      var previous_quality = this.item.quality;
      this.item.sell_in = 1;
      update_legendary_item(this.item);
      expect(this.item).to.have.quality(previous_quality);
    });

    it("should not degrade quality after sell date", function() {
      var previous_quality = this.item.quality;
      this.item.sell_in = -1;
      update_legendary_item(this.item);
      expect(this.item).to.have.quality(previous_quality);
    });
  });


  describe("Goblin's list", function() {
    describe("After 1 day", function() {
      before(function() {
        update_quality();
      });

      it("Dexterity vest 9, 19", function() {
        expect(items[0]).to.sell_in(9).and.have.quality(19);
      });

      it("Aged brie should be 1, 1", function() {
        expect(items[1]).to.sell_in(1).and.have.quality(1);
      });

      it("Elixir of the Mongoose should be 4, 6", function() {
        expect(items[2]).to.sell_in(4).and.have.quality(6);
      });

      it("Sulfuras, Hand of Ragnaros should be 0, 50", function() {
        expect(items[3]).to.sell_in(0).and.have.quality(50);
      });

      it("Backstage passes should be 14, 21", function() {
        expect(items[4]).to.sell_in(14).and.have.quality(21);
      });

      it("Conjured Mana Cake should be 2, 5", function() {
        expect(items[5]).to.sell_in(2).and.have.quality(4);
      });
    });

    describe("After 2 day", function() {
      before(function() {
        update_quality(); 
      });

      it("Dexterity vest 8, 18", function() {
        expect(items[0]).to.sell_in(8).and.have.quality(18);
      });

      it("Aged brie should be 0, 2", function() {
        expect(items[1]).to.sell_in(0).and.have.quality(2);
      });

      it("Elixir of the Mongoose should be 4, 5", function() {
        expect(items[2]).to.sell_in(3).and.have.quality(5);
      });

      it("Sulfuras, Hand of Ragnaros should be 0, 50", function() {
        expect(items[3]).to.sell_in(0).and.have.quality(50);
      });

      it("Backstage passes should be 13, 22", function() {
        expect(items[4]).to.sell_in(13).and.have.quality(22);
      });

      it("Conjured Mana Cake should be 1, 4", function() {
        expect(items[5]).to.sell_in(1).and.have.quality(2);
      });
    });

    describe("After 5 day", function() {
      before(function() {
        update_quality(); 
        update_quality(); 
        update_quality(); 
      });

      it("Dexterity vest 5, 15", function() {
        expect(items[0]).to.sell_in(5).and.have.quality(15);
      });

      it("Aged brie should be -3, 5", function() {
        expect(items[1]).to.sell_in(-3).and.have.quality(5);
      });

      it("Elixir of the Mongoose should be 0, 2", function() {
        expect(items[2]).to.sell_in(0).and.have.quality(2);
      });

      it("Sulfuras, Hand of Ragnaros should be 0, 50", function() {
        expect(items[3]).to.sell_in(0).and.have.quality(50);
      });

      it("Backstage passes should be 10, 25", function() {
        expect(items[4]).to.sell_in(10).and.have.quality(25);
      });

      it("Conjured Mana Cake should be -2, 0", function() {
        expect(items[5]).to.sell_in(-2).and.have.quality(0);
      });
    });

    describe("After 7 day", function() {
      before(function() {
        update_quality(); 
        update_quality(); 
      });

      it("Dexterity vest 3, 13", function() {
        expect(items[0]).to.sell_in(3).and.have.quality(13);
      });

      it("Aged brie should be -5, 7", function() {
        expect(items[1]).to.sell_in(-5).and.have.quality(7);
      });

      it("Elixir of the Mongoose should be -2, 0", function() {
        expect(items[2]).to.sell_in(-2).and.have.quality(0);
      });

      it("Sulfuras, Hand of Ragnaros should be 0, 50", function() {
        expect(items[3]).to.sell_in(0).and.have.quality(50);
      });

      it("Backstage passes should be 8, 29", function() {
        expect(items[4]).to.sell_in(8).and.have.quality(29);
      });

      it("Conjured Mana Cake should be -4, 0", function() {
        expect(items[5]).to.sell_in(-4).and.have.quality(0);
      });
    });

    describe("After 11 day", function() {
      before(function() {
        update_quality(); 
        update_quality(); 
        update_quality(); 
        update_quality(); 
      });

      it("Dexterity vest -1, 8", function() {
        expect(items[0]).to.sell_in(-1).and.have.quality(8);
      });

      it("Aged brie should be -9, 11", function() {
        expect(items[1]).to.sell_in(-9).and.have.quality(11);
      });

      it("Elixir of the Mongoose should be -6, 0", function() {
        expect(items[2]).to.sell_in(-6).and.have.quality(0);
      });

      it("Sulfuras, Hand of Ragnaros should be 0, 50", function() {
        expect(items[3]).to.sell_in(0).and.have.quality(50);
      });

      it("Backstage passes should be 4, 38", function() {
        expect(items[4]).to.sell_in(4).and.have.quality(38);
      });
    });

    describe("After 16 day", function() {
      before(function() {
        update_quality();
        update_quality();
        update_quality();
        update_quality();
        update_quality();
      });

      it("Backstage passes should be -1, 0", function() {
        expect(items[4]).to.sell_in(-1).and.have.quality(0);
      });
    });

    describe("After 36 day", function() {
      before(function() {
        for(var i = 0; i < 20; i++) {
          update_quality();	
        }
      });

      it("Dexterity vest -26, 0", function() {
        expect(items[0]).to.sell_in(-26).and.have.quality(0);
      });
    });
  });  
});
