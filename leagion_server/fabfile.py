from fabric.api import run, cd, sudo, hosts, prefix, settings

@hosts('leagion@138.197.169.179')
def update(branch=None):
	base = '~/Leagion'

	with cd(base), prefix('workon leagion'), settings(prompts={"Type 'yes' to continue, or 'no' to cancel: ": "yes"}):

		sudo('pwd') #do this to get the sudo password out of the way up front
		run('git fetch')

		if branch:
			run('git checkout %s' % branch)

		run('git pull')

		run('npm install')
		run('npm run build')

		run('pip install -r requirements.txt')
		run('find . -name "*.pyc" -delete')
		run('./manage.py collectstatic')

		sudo('systemctl restart nginx')
		sudo('systemctl restart gunicorn')
