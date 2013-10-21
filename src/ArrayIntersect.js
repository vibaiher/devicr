function ArrayIntersect() {
}

ArrayIntersect.intersect = function(one, two) {
  var index_one = 0, index_two = 0;
  var result = new Array();

  while( index_one < one.length && index_two < two.length )
  {
     if      (one[index_one] < two[index_two] ){ index_one++; }
     else if (one[index_one] > two[index_two] ){ index_two++; }
     else /* they're equal */
     {
       result.push(one[index_one]);
       index_one++;
       index_two++;
     }
  }

  return result;
}