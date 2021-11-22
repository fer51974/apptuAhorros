# Copyright (c) 2021, orlando Cholota and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Solicitud(Document):
	def before_insert(self):
		if self.tipo_credito == 'Microcrédito' :
			if self.monto > 1000 :
				frappe.throw(
    			title='Error',
    			msg="Microcredito no puede ser mayor a 1000"
				)
		if self.tipo_credito == 'Consumo' :
			if self.monto < 1000 or self.monto > 20000 :
				frappe.throw(
    			title='Error',
    			msg="Consumo debe estar entre 1000 y 20000 "
				)
		if self.tipo_credito == 'Vivienda' :
			if self.monto < 20000 :
				frappe.throw(
    			title='Error',
    			msg="Vivienda no puede ser menor a 20000"
				)
		
		
			