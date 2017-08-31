from fabric.api import run, cd, sudo, hosts, prefix

@hosts('leagion@138.197.169.179')
def update(branch=None):
	base = '~/Leagion'

	with cd(base), prefix('workon leagion'):

		run('git fetch')

		if branch:
			run('git checkout %s' % branch)

		run('git pull')

		run('pip install -r requirements.txt')
		run('find . -name "*.pyc" -delete')

		run('npm install')

		sudo('service nginx restart')
		sudo('service gunicorn restart')

