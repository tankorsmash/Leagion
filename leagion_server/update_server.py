from fabric.api import run, cd, sudo, hosts, prefix

@hosts('leagion@138.197.169.179')
def update(branch=None):
	base = '~/Leagion'

	with cd(base):

		run('git fetch')

		if branch:
			run('git checkout %s' % branch)

		run('git pull')

		run('workon leagion && pip install -r requirements.txt')
		run('find . -name "*.pyc" -delete')

		run('npm install')
		run('webpack -p')

		sudo('systemctl restart nginx')
		sudo('systemctl restart gunicorn')
