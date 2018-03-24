from gpiozero import LED
from signal import pause
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
IRPIN = 17

GPIO.setup(IRPIN, GPIO.IN)
count = 1
gotCount = 0 

			
while True:
	gotSomethin = GPIO.input(IRPIN)
	if gotSomethin:
		gotCount +=1
		if gotCount == 200:
			f = open ('file.txt', 'w')
			f.write('true')
			f.close()
			time.sleep(60)
			f = open ('file.txt', 'w')
			f.write('false')
			f.close()
	else:
		gotCount = 0
		print('{:>3} Nothin detected'.format(count))
	count += 1
