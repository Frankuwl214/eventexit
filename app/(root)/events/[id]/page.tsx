import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import Image from 'next/image';

const EventDetails = ({ eventDetails, relatedEvents }) => {
  // Check if eventDetails are available
  if (!eventDetails) {
    return <div>Error loading event details</div>;
  }

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        {/* Your component implementation */}
      </section>

      {/* Other sections */}
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const eventDetails = await getEventById(id);
    const relatedEvents = await getRelatedEventsByCategory({
      categoryId: eventDetails.category._id,
      eventId: eventDetails._id,
      page: context.query.page || 1,
      limit: 3 // Assuming you have a limit for related events
    });

    return {
      props: {
        eventDetails,
        relatedEvents: relatedEvents?.data || [],
      },
    };
  } catch (error) {
    console.error('Error loading event details:', error);
    return {
      props: {
        eventDetails: null,
        relatedEvents: [],
      },
    };
  }
}

export default EventDetails;
