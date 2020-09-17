import test from 'ava';
import m from './';

test('wikipic.current()', async t => {
	const current = await m();

	t.is(current.image, 'https://upload.wikimedia.org/wikipedia/commons/3/32/Saltwater_Limpet_Diagram-en.svg');
	t.is(current.name, 'Saltwater_Limpet_Diagram-en.svg');
	t.is(current.data, 'The picture of the day is an image which is automatically updated each day with an image from Wikipedia:Featured pictures. Although the picture of the day is generally scheduled by one editor (currently Crisco 1492), anybody can contribute. If you have concerns about the current picture of the day, please post at Wikipedia:Main Page/Errors. If you have concerns about an upcoming POTD, consider either fixing it yourself or posting at Wikipedia talk:Picture of the day or User talk:Crisco 1492.');
});

test('wikipic.day()', async t => {
	const day = await m('2016-10-10');

	t.is(day.image, 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Odissi_Performance_DS.jpg');
	t.is(day.name, 'Odissi_Performance_DS.jpg');
	t.is(day.data, 'Odissi is an ancient classical dance that originated in the Hindu temples of Odisha, India. Historically, it has been performed predominantly by women, and expressed religious stories and spiritual ideas, particularly of Vaishnavism (Vishnu as Jagannath), but also of other traditions such as those related to Hindu gods Shiva and Surya, as well as Hindu goddesses (Shaktism). Modern Odissi productions by Indian artists have presented a diverse range of experimental ideas, culture fusion, themes and plays.');
});
