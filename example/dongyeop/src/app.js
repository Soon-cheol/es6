import 'bootstrap/dist/css/bootstrap.css'
import data from './data'
import $ from 'jquery';


(function dataSetting(data, $) {
	const $table = $('.table');
	const setHead = (idx=0) => {
		const $head = $table.find('thead tr');
		const text = Object.keys(data[0])[idx];
		
		$('<th>').html(Object.keys(data[0])[idx]).appendTo($head);
		
		if(idx < Object.keys(data[0]).length - 1){
			return setHead(++idx);	
		}
	}
	
	const setTr = (idx=0) => {
		const $body = $table.find('tbody');
		const $tr = $('<tr>').appendTo($body);
		setBody($tr, data[idx] );
		if(data.length -1 > idx) return setTr(++idx);
		
	}
	
	const setBody = ($tr, values, idx=0) => {
		let text = Object.values(values);
		if(typeof text[idx] == 'object') {
			text[idx] = Object.values(text[idx]).join('<br> ');
			
		}
		$('<td>').html(text[idx]).appendTo($tr);
		
		if(text.length - 1 > idx){
			return setBody($tr, values, ++idx);	
		}
	}
	
	const init = () => {
		setHead();
		setTr();
	}
	init();
})(data, $)

