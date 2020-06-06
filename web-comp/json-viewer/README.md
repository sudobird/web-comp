# JSON Viewer

Collapsible JSON viewer in tree format with console like UI. 

### Installation:
```
npm install @web-comp/core
npm install @web-comp/json-viewer
```
> json viewer depends on @web-comp/core to work.

### Usage:
```
import '@web-comp/core';
import '@web-comp/json-viewer';
```

template:
```
<div> // container div
    <wc-json-viewer id="myjson"></wc-json-viewer>
</div>
```

JS - 
```
const element = document.getElementById("myjson");
const jsonData = {name: 'sudobird', ........};      // json array or object
element.setConfig({data: jsonData});
```

### Example:

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

<img src="https://github.com/sudobird/web-comp/blob/master/src/components/json-viewer/docs/viewer.png?raw=true" height="400px"/> <img src="https://github.com/sudobird/web-comp/blob/master/src/components/json-viewer/docs/viewer.gif?raw=true" height="400px"/>


## Usage with Angular:
- ```npm install @web-comp/core @web-comp/json-viewer```
- set ```schemas: [CUSTOM_ELEMENTS_SCHEMA]``` in the module. 
- import core module and json-viewer module.
```
import '@web-comp/core';
import '@web-comp/json-viewer';
```

```
 <wc-json-viewer #jsonview></wc-json-viewer>
```

```
@ViewChild('jsonview') jsonview;
....
const jsonData = {....} // your json
this.jsonview.nativeElement.setConfig({data: jsonData});
```


## Usage with React:
Install and import modules (core and json viewer)
```
import '@web-comp/core';
import '@web-comp/json-viewer';


<wc-json-viewer ref="jsonRef"></wc-json-viewer>

// in JS
componentDidMount() {
    this.jsonRef.current.setConfig({data: <jsonObj>});
}
```


 
