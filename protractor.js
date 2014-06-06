  var expectNutritionNames = function(expectedNames, key) {
    element.all(by.repeater(key + ' in Nutritions').column(key + '.name')).then(function(arr) {
      arr.forEach(function(wd, i) {
        expect(wd.getText()).toMatch(expectedNames[i]);
      });
    });
  };

  it('should search across all fields when filtering with a string', function() {
    var searchText = element(by.model('searchText'));
    searchText.clear();
    searchText.sendKeys('a');
    expectNutritionNames(['Apple', 'Apricot', 'Banana', 'Clementine'], 'Nutrition');

    searchText.clear();
    searchText.sendKeys('7');
    expectNutritionNames(['Apricot', 'Cherry'], 'Nutrition');
  });

  it('should search in specific fields when filtering with a predicate object', function() {
    var searchAny = element(by.model('search.$'));
    searchAny.clear();
    searchAny.sendKeys('b');
    expectNutritionNames(['Banana', 'Blueberry'], 'NutritionObj');
  });
  it('should use a equal comparison when comparator is true', function() {
    var searchName = element(by.model('search.name'));
    var strict = element(by.model('strict'));
    searchName.clear();
    searchName.sendKeys('Apple');
    strict.click();
    expectNutritionNames(['Apple'], 'NutritionObj');
  });