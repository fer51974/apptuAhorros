# Copyright (c) 2021, orlando Cholota and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import today
import datetime
from datetime import datetime
from datetime import timedelta
from frappe.model.document import Document

class Garantes(Document):
	def before_insert(self):
		if len(self.ci)<10 :
			frappe.throw(
    		title='Error',
    		msg="cedula incorrecta"
			)
		ahora = datetime.now()
		hace18años = ahora - timedelta(weeks=864)
		hace18añosformat = hace18años.strftime("%Y-%m-%d")
		if self.fecha_nacimiento>hace18añosformat:
			frappe.throw(
    		title='Error',
    		msg="menor de edad"
			)