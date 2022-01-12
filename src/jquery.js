window.jQuery = function(selectorOrArray) {
    let element
    if (typeof selectorOrArray === "string") {
        element = document.querySelectorAll(selectorOrArray);
    } else if (selectorOrArray instanceof Array) {
        element = selectorOrArray;
    }
    return { //返回的这个对象统称为API
        // 这里的addClass和外部element变量形成了闭包

        addClass(className) {
            for (let i = 0; i < element.length; i++) {
                element[i].classList.add(className);
            }
            return this; //调用addClass()的对象就是API，所以再把API返回，就可以链式操作了
        },
        each(fn) {
            for (let i = 0; i < element.length; i++) {
                fn.call(null, element[i]);
            }
            return this;
        },
        parent() {
            const array = [];
            this.each((node) => {
                array.push(node.parentNode);
            })
            return jQuery(array);
        },
        print() {
            console.log(element);
        },
        children() {
            const array = []
            this.each((node) => {
                array.push(...node.children) //node.children是一个数组，...扩展运算符，可以把数组的每个元素拆分出来

            })
            return jQuery(array)
        },
        find(selector) {
            let array = [];
            for (let i = 0; i < element.length; i++) {
                //把获得元素连接起来
                const newElements = Array.from(element[i].querySelectorAll(selector));
                array = array.concat(newElements);
            }
            array.oldApi = this; //this指的是前一个对象调用jQury()返回的API，相当于上一个API
            return jQuery(array); //把当前array的引用赋值给element，这样API这个对象操作就是array里面的元素了
        },
        oldApi: selectorOrArray.oldApi,
        end() {
            return this.oldApi; //当前API里面保存了上一次API的引用，这里返回上一次API的引用就相当于返回上一个被操作的元素对象
        }

    }
}