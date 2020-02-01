module.exports = function (plop) {
	plop.setGenerator('sketch', {
		description: 'Create New Sketch',
		prompts: [
            {
                name: 'name',
                message: 'Qui Demande ?'
            },
			{
				name: 'folder',
				message: 'Nom Du Dossier'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'sketch/{{ name }}/{{ folder }}/index.html',
				templateFile: 'template/index.html'
			},
			{
				type: 'add',
				path: 'sketch/{{ name }}/{{ folder }}/sketch.js',
				templateFile: 'template/sketch.js'
			}
		]
	})
}
