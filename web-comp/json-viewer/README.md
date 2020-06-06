# JSON Viewer

JSON viewer in templates as collapsible tree structure

### Installation:
```
npm install @web-comp/core
npm install @web-comp/json-viewer
```
> Date picker depends on @web-comp/core to work.

### Usage:
```
import '@web-comp/core';
import '@web-comp/json-viewer';
```

template -
```
<div> // container div
    <wc-json-viewer id="myjson"></wc-date-picker>
</div>
```

JS - 
```
const element = document.getElementById("myjson");
const jsonData = {name: 'sudobird', ........};      //should be array or object
element.setConfig({data: jsonData});
```

### Example -  

```
const jsonData = {
    name: "sudobird",
    age: 99,
    cities: ['abc', 'def', 'ghi'],
    gender: 'M',
    car: null,
    pan: 'BBGHGJ8485',
    isActive: false,
    jobs: [
        {title: 'Software Engineer', city: 'abc'},
        {title: 'Consultant', city: 'def'},
    ]
}
```

<img src="https://github.com/sudobird/web-comp/blob/master/src/components/date-picker/docs/single-date-screen.png?raw=true" alt="single date selection" width="200"/> <img src="https://github.com/sudobird/web-comp/blob/master/src/components/date-picker/docs/range-screen.png?raw=true" alt="date range selection" width="200"/> <img src="https://github.com/sudobird/web-comp/blob/master/src/components/date-picker/docs/ym-screen.png?raw=true" alt="year month selector" width="200"/>

...............................................................................................

## Usage with Angular - 
- ```npm install @web-comp/core @web-comp/date-picker```
- set ```schemas: [CUSTOM_ELEMENTS_SCHEMA]``` in the module. 
- import core module and json-viewer module.
```
import '@web-comp/core';
import '@web-comp/date-picker';
```

```
 <wc-json-viewer id="picker"></wc-date-picker>
```

```
@ViewChild('picker') picker;
....
const jsonData = {....} // your json
this.picker.nativeElement.setConfig({data: jsonData});
```


## Usage with React -
Mostly same as angular, install and import modules (core and json viewer). 
```
<wc-json-viewer ref="jsonRef"></wc-date-picker>

// in JS
componentDidMount() {
    this.jsonRef.current.setConfig({data: <jsonObj>});
}
```


 
