from setuptools import setup, find_packages

setup(
    name='gandalf',
    version='1.0.0',
    description='Multimedia Analysis API',
    url='',
    author='Lorenzo Vannucchi',

    classifiers=[
        'Intended Audience :: Developers',
        'Topic :: Software Development :: Libraries :: Application Frameworks',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],

    keywords='rest restful api flask swagger openapi flask-restplus',

    packages=find_packages(),

    install_requires=['flask-restplus==0.13.0', 'Flask-SQLAlchemy==2.1'],
)
