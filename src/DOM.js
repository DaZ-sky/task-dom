import { doc } from "prettier";
import { createModuleResolutionCache } from "typescript"

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
  for(let i=0;i<count;++i){
    let new_elem = document.createElement(tag)
    new_elem.innerHTML = content
    document.body.append(new_elem)
  }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
  let parent = document.createElement('div');
  document.body.append(parent);
  parent.setAttribute('class', 'item_' + 1);
  buildTree(parent, childrenCount, 1, level)
  return parent
}

function buildTree(parent, childrenCount, current_level, level){
 if (current_level<level){
  for(let i=0;i<childrenCount;++i){
    let children = document.createElement('div')
    children.setAttribute('class', 'item_'+ (current_level+1))
    parent.append(children)
    buildTree(children, childrenCount,current_level+1, level)
  }
  }
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
  let tree = generateTree(2, 3)
  let root = document.getElementsByClassName('item_1')[0]
  for (let node of document.getElementsByClassName('item_2')){
    if (node.tagName != 'SECTION') {
      let newNode = document.createElement('SECTION')
      newNode.setAttribute('class', 'item_2')
      for (let i = 0; i < 2; ++i)
        newNode.append(node.firstChild)
      root.append(newNode)
    }
  }
  for (let i = 0; i < 2; ++i)
    root.removeChild(document.getElementsByClassName('item_2')[0])
  return tree
}
