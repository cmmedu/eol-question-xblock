"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from django.template import Context, Template
from xblock.core import XBlock
from xblock.fields import Integer, String, Scope
from xblock.fragment import Fragment

# Make '_' a no-op so we can scrape strings
_ = lambda text: text


class EolQuestionXBlock(XBlock):

    # TYPE : [Calificada, No Calificada, Control]
    type = String(
        display_name = _("Tipo"),
        help = _("Selecciona el tipo de pregunta"),
        default = 'Calificada',
        scope = Scope.settings
    )

    # INDEX
    index = Integer(
        display_name = _("Indice"),
        help = _("Indica el indice de la pregunta"),
        default = 3,
        values = { "min" : 1, "step" : 1 },
        scope = Scope.settings
    )

    # TEXT
    text = String(
        display_name = _("Enunciado"),
        help = _("Indica el enunciado de la pregunta"),
        default = 'texto de prueba ',
        values = { "minlength" : 5 },
        scope = Scope.settings
    )


    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def student_view(self, context=None):
        context_html = self.get_context_student()
        template = self.render_template('static/html/eolquestion.html', context_html)
        frag = Fragment(template)
        frag.add_css(self.resource_string("static/css/eolquestion.css"))
        frag.add_javascript(self.resource_string("static/js/src/eolquestion.js"))
        frag.initialize_js('EolQuestionXBlock')
        return frag

    #TODO: studio_view

    #TODO: studio_submit

    def get_context_student(self):
        return {
            'field_type': self.fields['type'],
            'field_index': self.fields['index'],
            'field_text': self.fields['text'],
            'xblock': self
        }
    
    def render_template(self, template_path, context):
        template_str = self.resource_string(template_path)
        template = Template(template_str)
        return template.render(Context(context))

    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("EolQuestionXBlock",
             """<eolquestion/>
             """),
        ]
