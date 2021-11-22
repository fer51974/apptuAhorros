// Copyright (c) 2021, orlando Cholota and contributors
// For license information, please see license.txt

frappe.ui.form.on('Solicitud', {
	setup: frm=>{
		frm.check_activos = function (frm,row){
			var subtotal= 0;
			frm.doc.activos.forEach(item=>{
				subtotal = subtotal+parseFloat(item.subtotal);
				if(row.nombre=='' || row.idx==item.idx){	
					console.log("se inserto normal");		
				}else{
					if(row.nombre==item.nombre){
						row.nombre='';
						frappe.throw(__('ya existe este artículo'));
						frm.refresh_field('Activos');
					}
					
				}
			
			})
			console.log("subtotal",subtotal);
			frm.set_value('total_activos',subtotal);
			var total_pasivos=parseFloat(frm.doc.total_pasivos);
			frm.set_value('capital',subtotal-total_pasivos);
		}
		frm.check_pasivos = function (frm,row){
			var subtotal= 0;
			frm.doc.pasivos.forEach(item=>{
				subtotal = subtotal+parseFloat(item.subtotal);
				if(row.nombre=='' || row.idx==item.idx){	
					//console.log("se inserto normal");		
				}else{
					if(row.nombre==item.nombre){
						row.nombre='';
						frappe.throw(__('ya existe este artículo'));
						frm.refresh_field('Activos');
					}
					
				}
			
			})
			
			frm.set_value('total_pasivos',subtotal);
			var total_activos=parseFloat(frm.doc.total_activos);
			frm.set_value('capital',total_activos-subtotal);
			console.log("totalActivos",frm.doc.total_activos);

		}
	}
});
frappe.ui.form.on('Detalle_Activos', {
	cantidad: function(frm,cdt,cdn){
		//console.log("frm",frm);	
		//obtener el dato ingresando
		let row = locals[cdt][cdn];
		var total =0;
		frappe.model.set_value(row.doctype,row.name,"subtotal",row.valor * row.cantidad);
		console.log("este es el nuevo subtotal",row.subtotal);
		frm.check_activos(frm,row);
		
	}
});
frappe.ui.form.on('Detalle_Pasivos', {
	cantidad: function(frm,cdt,cdn){
		//console.log("frm",frm);	
		//obtener el dato ingresando
		let row = locals[cdt][cdn];
		var total =0;
		frappe.model.set_value(row.doctype,row.name,"subtotal",row.valor * row.cantidad);
		//console.log("este es el nuevo subtotal",row.subtotal);	
		frm.check_pasivos(frm,row);
	}
});
