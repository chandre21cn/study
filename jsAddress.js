﻿/**
 * 省市区三级联动 
 */
function Address(options){
	this.province = document.getElementById(options.province.id);
	this.city = document.getElementById(options.city.id);
	this.area = document.getElementById(options.area.id);
	this.provinceCode = options.province.code;
	this.cityCode = options.city.code;
	this.countyCode = options.area.code;
	this.setProvince();
	this.bindEvent();
}

/**
 * 设置省
 */
Address.prototype.setProvince = function(){
	var it = this,
		target = this.provinceCode;
	$.ajax({
		url:baseRoot+'/area/findProvince.html',
		dataType:'json',
		data:{nodecode:'CATALOG_REGION'},
		success:function(result){
			var arr = it.format(result),
				options = it.createOptions(arr,target);
			it.province.appendChild(options);
			it.setCity(target||arr[0].id);
		}
	});
}
/**
 * 设置市 
 */
Address.prototype.setCity = function(code){
	var it = this,
		target=this.cityCode;
	$.ajax({
		url:baseRoot+'/area/findCity.html',
		dataType:'json',
		data:{provinceCode:code},
		success:function(result){
			var arr = it.format(result),
 			    options = it.createOptions(arr,target);
			it.city.innerHTML = '';
			it.city.appendChild(options);
			it.setArea(target||arr[0].id);
		}
	});
}
/**
 * 设置区
 */
Address.prototype.setArea = function(code){
	var it = this,
		target = this.countyCode;
	$.ajax({
		url:baseRoot+'/area/findCounty.html',
		dataType:'json',
		data:{cityCode:code},
		success:function(result){
			var arr = it.format(result),
			    options = it.createOptions(arr,target);
			it.area.innerHTML = '';
			it.area.appendChild(options);
			it.countyCode = target || arr[0].id;
		}
	});
}
/**
 * 设置默认显示项 
 */
Address.prototype.setDefault=function(options,target){
	var i = 0,
		n = options.length;
	for(; i<n; i++){
		if(options[i].value === target){
			options[i].selected = true;
			break;
		}
	}
}

Address.prototype.handleChangeProvince = function(code){
	this.provinceCode = code;
	this.cityCode = null;
	this.setCity(code);
}

Address.prototype.handleChangeCity = function(code){
	this.cityCode = code;
	this.countyCode = null;
	this.setArea(code);
}

Address.prototype.handleChangeArea = function(code){
	this.countyCode = code;
}
 
Address.prototype.format = function(data){
	var arr = [];
	for(var i in data){
		arr.push({id:i,value:data[i]});
	}
	arr.sort(function(a,b){
		return a.id - b.id;
	});

	return arr;
}

Address.prototype.createOptions = function(data,target){
	var oFragment = document.createDocumentFragment();
	for(var i =0,n=data.length;i<n;i++){
		var option = document.createElement("option");
		option.value = data[i].id;
		option.innerHTML = data[i].value;
		if(target === data[i].id){
			option.selected = true;
		}
		oFragment.appendChild(option);
	}
	return oFragment;
}

Address.prototype.bindEvent = function(){
	var it = this;
	this.province.addEventListener('change',function(e){
		it.handleChangeProvince(e.target.value);
	});
	this.city.addEventListener('change',function(e){
		it.handleChangeCity(e.target.value)
	});
	this.area.addEventListener('change',function(e){
		it.handleChangeArea(e.target.value)
	});
}