module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  return item.enchancement < 20 ? { ...item , enchancement: item.enchancement + 1} : { ...item }  ;
}
function fail(item) {
  if(item.enchancement < 15){
    return { ...item,  durability: item.durability - 5};
  }else{
    if(item.enchancement > 16){
      return { ...item ,durability: item.durability - 10, enchancement: item.enchancement - 1}
    }else{
      return { ...item ,durability: item.durability - 10};
    }
  }
}

function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  return item.enchancement == 0 ? { ...item } : {...item, name: `[+${item.enchancement}] ${item.name}`};
}
