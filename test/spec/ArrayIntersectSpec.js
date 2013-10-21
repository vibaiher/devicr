describe("ArrayIntersect.intersect", function() {

  it("returns array B if array A contains array B", function() {
    // Act
    var array_one = ['A', 'B', 'C'], array_two = ['B'];

    // Arrange
    var result = ArrayIntersect.intersect(array_one, array_two);

    // Assert
    expect(result).toEqual(array_two);
  });

  it("returns array A if array B contains array A", function() {
    // Act
    var array_one = ['B', 'C'], array_two = ['A', 'B', 'C'];

    // Arrange
    var result = ArrayIntersect.intersect(array_one, array_two);

    // Assert
    expect(result).toEqual(array_one);
  });

  it("returns an array with only the values present into array A and B", function() {
    // Act
    var array_one = ['A', 'B', 'C'], array_two = ['C', 'D', 'E'];
    var expected_result = ['C'];

    // Arrange
    var result = ArrayIntersect.intersect(array_one, array_two);

    // Assert
    expect(result).toEqual(expected_result);
  });

});