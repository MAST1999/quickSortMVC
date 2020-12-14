class Model {
    constructor() {
        this.data = []
    }

    swap(array, leftIndex, rightIndex) {
        var temp = array[leftIndex];
        array[leftIndex] = array[rightIndex];
        array[rightIndex] = temp;
    }

    partition(array, left, right) {
        var pivot = array[Math.floor((right + left) / 2)],
            l = left,
            r = right;
        console.log(`this is quickSort left: ${left}, right: ${right} and array: ${array}`);
        console.log(pivot);
        while (l <= r) {
            while (array[l] < pivot) {
                l++;
            }
            while (array[r] > pivot) {
                r--;
            }
            if (l <= r) {
                this.swap(array, l, r);
                l++;
                r--;
            }
        }
        return l;
    }

    quickSort(array, left, right) {
        var index;
        if (array.length > 1) {
            index = this.partition(array, left, right);
            if (left < index - 1) {
                this.quickSort(array, left, index - 1);
            }
            if (index < right) {
                this.quickSort(array, index, right);
            }
        }
        return array;
    }

    dissolveInput(string) {
        this.data = []
        var newArray = string.split(',');
        newArray.forEach(item => {
            item = parseFloat(item)
            this.data.push(item)
        })
        this.data = this.quickSort(this.data, 0, this.data.length - 1)
    }

    dataFixingForShowing(data) {
        const newData = data.join()
        console.log(newData);
        return newData
    }
}
class View {
    constructor() {
        this.root = document.querySelector('#root')

        this.header = document.createElement('h1')
        this.header.textContent = 'Quick Sort'

        this.form = document.createElement('div')
        this.form.id = 'form'
        this.label = document.createElement('label')
        this.label.textContent = 'Enter the array and separate with "," : '
        this.input = document.createElement('input')
        this.input.type = 'text'
        this.input.id = 'enter'
        this.input.placeholder = '32,55,35,643,1,66'
        this.btnSubmit = document.createElement('button')
        this.btnSubmit.id = 'btnSubmit'
        this.btnSubmit.textContent = 'Go'
        this.form.append(this.label, this.input, this.btnSubmit)

        this.results = document.createElement('div')
        this.results.id = 'results'
        this.results.textContent = 'Result of the quick sort will appear here!'

        this.root.append(this.header, this.form, this.results)
    }

    bindQuickSort(handlerForSort, handler) {
        this.root.addEventListener('click', event => {
            event.preventDefault();

            if (event.target.textContent === 'Go') {
                handlerForSort(this.input.value)
            }
        })
    }
    bindShowing(data) {
        // this.input.value = ''
        const string = data.join()
        if (string) {
            this.results.textContent = string
        } else {
            this.results.textContent = 'Result of the quick sort will appear here!'
        }

    }
}
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.handelQuickSort = this.handelQuickSort.bind(this)
        this.handelShowing = this.handelShowing.bind(this)

        this.view.bindQuickSort(this.handelQuickSort, this.handelShowing)

        this.handelShowing()
    }

    handelQuickSort(inputValue) {
        this.model.dissolveInput(inputValue)
        this.handelShowing()
    }

    handelShowing() {
        this.view.bindShowing(this.model.data)
    }
}
const App = new Controller(new Model(), new View())